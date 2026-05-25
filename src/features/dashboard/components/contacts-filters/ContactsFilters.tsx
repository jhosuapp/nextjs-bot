import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import type { JSX } from "react";

import { TextField } from "@/src/shared/components/text-field/TextField";
import type { ITranslations } from "@/src/shared/interfaces/i18n.interface";

import styles from "./contacts-filters.module.css";

type ContactsFiltersProps = {
  t: ITranslations;
  search: string;
  onSearchChange: (value: string) => void;
  from: string;
  onFromChange: (value: string) => void;
  to: string;
  onToChange: (value: string) => void;
  onReset: () => void;
};

const ContactsFilters = ({
  t,
  search,
  onSearchChange,
  from,
  onFromChange,
  to,
  onToChange,
  onReset,
}: ContactsFiltersProps): JSX.Element => {
  const hasFilters = search !== "" || from !== "" || to !== "";

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrap}>
        <TextField
          style="primary"
          name="dashboard-search"
          placeholder={t("filters.searchPlaceholder") as string}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          noAnimate
          childrenIsIcon
          classNameParent={styles.searchField}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={styles.searchIcon}
          />
        </TextField>
      </div>

      <div className={styles.dateGroup}>
        <label className={styles.dateField}>
          <span className={styles.dateLabel}>
            {t("filters.fromLabel") as string}
          </span>
          <input
            type="date"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            max={to || undefined}
            className={styles.dateInput}
          />
        </label>
        <label className={styles.dateField}>
          <span className={styles.dateLabel}>
            {t("filters.toLabel") as string}
          </span>
          <input
            type="date"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            min={from || undefined}
            className={styles.dateInput}
          />
        </label>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className={styles.resetButton}
          aria-label={t("filters.resetAria") as string}
        >
          <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
          <span>{t("filters.reset") as string}</span>
        </button>
      )}
    </div>
  );
};

export { ContactsFilters };
