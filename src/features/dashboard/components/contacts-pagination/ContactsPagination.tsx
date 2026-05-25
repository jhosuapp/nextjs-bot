import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { JSX } from "react";

import type { ITranslations } from "@/src/shared/interfaces/i18n.interface";

import styles from "./contacts-pagination.module.css";

type ContactsPaginationProps = {
  t: ITranslations;
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const ContactsPagination = ({
  t,
  page,
  totalPages,
  onChange,
}: ContactsPaginationProps): JSX.Element => {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className={styles.pagination}>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(page - 1)}
          disabled={!canPrev}
          aria-label={t("pagination.prev") as string}
        >
          <FontAwesomeIcon icon={faChevronLeft} aria-hidden="true" />
          <span>{t("pagination.prev") as string}</span>
        </button>

        <span className={styles.pageIndicator}>
          {t("pagination.pageOf", { page, totalPages }) as string}
        </span>

        <button
          type="button"
          className={styles.pageButton}
          onClick={() => onChange(page + 1)}
          disabled={!canNext}
          aria-label={t("pagination.next") as string}
        >
          <span>{t("pagination.next") as string}</span>
          <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export { ContactsPagination };
