# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run start    # start production server
npm run lint     # run ESLint
```

## Architecture

This project uses a **feature-based architecture** under `src/`.

```
src/
  features/<feature>/     # one folder per route/feature
    views/                # <Feature>.view.tsx — the root component for the feature
    components/           # UI components scoped to this feature
    actions/              # server/client actions
    hooks/                # hooks scoped to this feature
    stores/               # Zustand stores scoped to this feature
  shared/
    components/           # globally reusable UI components
    stores/               # global Zustand stores
    hooks/                # global hooks
    helpers/              # utility functions
    libs/                 # third-party wrappers (axios instance, etc.)
app/
  <route>/page.tsx        # thin shell — imports and renders the feature View, nothing else
```

### Key conventions

**`/app` pages are shells.** All logic, state, and markup live in the feature. A page file should only import and render the View:

```tsx
// app/page.tsx
import { HomeView } from "@/src/features/home/views/Home.view";
export default function Home() {
  return <HomeView />;
}
```

**View files are named `<Feature>.view.tsx`** and exported as named exports.

**Path alias:** `@/*` maps to the repo root, so use `@/src/...` for imports.

## Styling

- **Tailwind v4** via `@import "tailwindcss"` in `globals.css`.
- **Never use inline Tailwind classes** in `.tsx` files for component-level styles. Use `*.module.css` files instead.
- Layout/structural one-offs (flex, grid on a wrapper) can use Tailwind utility classes inline, but all design-token–based styles (colors, spacing rhythm, typography) must go through the module file.
- Color palette is defined in `app/globals.css` under `@theme inline`. **Always use palette tokens** (`bg-background`, `text-foreground`, etc.) — never raw hex values or arbitrary Tailwind colors.
- Module CSS files use `@reference "tailwindcss"` at the top to access `@apply` with Tailwind utilities.

## Animations

**All page and component animations must use [framer-motion](https://www.framer.com/motion/).** Do not use CSS transitions/keyframes or other JS animation libraries for anything beyond static hover effects. Use `motion.*` components and `AnimatePresence` for enter/exit transitions.

## State management

Zustand v5 is the only store solution. Place stores in `src/shared/stores/` if global, or `src/features/<feature>/stores/` if scoped to one feature.

## HTTP

Use the Axios instance in `src/shared/libs/` for all HTTP calls. Do not use `fetch` directly.

## Barrel files

**Barrel files (`index.ts` / `index.tsx`) are strictly forbidden.** They force bundlers and the TypeScript compiler to load entire module trees eagerly, which hurts build times, cold-start performance, and tree-shaking. Always import directly from the source file:

```ts
// correct
import { HomeView } from "@/src/features/home/views/Home.view";

// forbidden — never create or import from an index file
import { HomeView } from "@/src/features/home";
```

Do not create `index.ts` or `index.tsx` anywhere in the project.
