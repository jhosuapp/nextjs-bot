import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import type { JSX } from "react";

import { Text } from "@/src/shared/components/text/Text";
import type { ITranslations } from "@/src/shared/interfaces/i18n.interface";
import type { ContactRecord } from "../../validations/contacts-query.validation";

import styles from "./contacts-table.module.css";

type ContactsTableProps = {
  t: ITranslations;
  items: ContactRecord[];
  isLoading: boolean;
  isFetching: boolean;
};

const SKELETON_ROWS = 6;

const ContactsTable = ({
  t,
  items,
  isLoading,
  isFetching,
}: ContactsTableProps): JSX.Element => {
  const router = useRouter();
  const locale = router.locale ?? "es";
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className={styles.wrapper} data-fetching={isFetching || undefined}>
      <span className={styles.progressBar} aria-hidden="true" />
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t("table.name") as string}</th>
              <th>{t("table.company") as string}</th>
              <th>{t("table.email") as string}</th>
              <th>{t("table.phone") as string}</th>
              <th>{t("table.createdAt") as string}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className={styles.skeletonRow}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <td key={j}>
                        <span className={styles.skeletonCell} />
                      </td>
                    ))}
                  </tr>
                ))
              : items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.company}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}`}
                        className={styles.link}
                      >
                        {item.email}
                      </a>
                    </td>
                    <td>{item.phone_number}</td>
                    <td>{formatter.format(new Date(item.createdAt))}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!isLoading && items.length === 0 && (
        <div className={styles.empty} role="status">
          <FontAwesomeIcon
            icon={faInbox}
            className={styles.emptyIcon}
            aria-hidden="true"
          />
          <Text tag="p" variant="subtitle_small" color="secondary" weight="semibold" zoomIn>
            {t("table.empty") as string}
          </Text>
          <Text tag="p" variant="description_xs" color="muted" zoomIn>
            {t("table.emptyHint") as string}
          </Text>
        </div>
      )}
    </div>
  );
};

export { ContactsTable };
