import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '10mb',
  },
};

type TranscribeResponse = { text: string } | { error: string };

const OPENAI_URL = 'https://api.openai.com/v1/audio/transcriptions';

const readMultipartFile = async (
  req: NextApiRequest,
): Promise<{ blob: Blob; locale: string } | null> => {
  const contentType = req.headers['content-type'] ?? '';
  if (!contentType.includes('multipart/form-data')) return null;

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : (chunk as Buffer));
  }
  const buffer = Buffer.concat(chunks);

  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
  const boundary = boundaryMatch?.[1] ?? boundaryMatch?.[2];
  if (!boundary) return null;
  const boundaryBuffer = Buffer.from(`--${boundary}`);

  let locale = 'es';
  let audioBlob: Blob | null = null;

  let cursor = 0;
  while (cursor < buffer.length) {
    const partStart = buffer.indexOf(boundaryBuffer, cursor);
    if (partStart === -1) break;
    const sectionStart = partStart + boundaryBuffer.length;
    const partEnd = buffer.indexOf(boundaryBuffer, sectionStart);
    if (partEnd === -1) break;
    const part = buffer.slice(sectionStart, partEnd - 2); // strip trailing CRLF
    const headerEnd = part.indexOf(Buffer.from('\r\n\r\n'));
    if (headerEnd === -1) {
      cursor = partEnd;
      continue;
    }
    const headers = part.slice(0, headerEnd).toString('utf8');
    const body = part.slice(headerEnd + 4);
    const nameMatch = headers.match(/name="([^"]+)"/);
    if (!nameMatch) {
      cursor = partEnd;
      continue;
    }
    const name = nameMatch[1];
    const filenameMatch = headers.match(/filename="([^"]+)"/);
    if (filenameMatch) {
      const typeMatch = headers.match(/Content-Type: ([^\r\n]+)/);
      audioBlob = new Blob([body], { type: typeMatch?.[1] ?? 'audio/webm' });
    } else if (name === 'locale') {
      locale = body.toString('utf8').trim();
    }
    cursor = partEnd;
  }

  if (!audioBlob) return null;
  return { blob: audioBlob, locale };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TranscribeResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: 'transcription_unavailable' });
    return;
  }

  const parsed = await readMultipartFile(req);
  if (!parsed) {
    res.status(400).json({ error: 'invalid_audio_payload' });
    return;
  }

  const form = new FormData();
  form.append('file', parsed.blob, 'speech.webm');
  form.append('model', 'whisper-1');
  form.append('language', parsed.locale);

  try {
    const upstream = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `openai_${upstream.status}` });
      return;
    }

    const data = (await upstream.json()) as { text?: string };
    res.status(200).json({ text: data.text ?? '' });
  } catch (e) {
    res.status(500).json({
      error: e instanceof Error ? e.message : 'transcription_failed',
    });
  }
}
