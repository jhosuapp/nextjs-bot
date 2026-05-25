import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import type { JSX } from "react";

import { Text } from "@/src/shared/components/text/Text";
import type { ITranslations } from "@/src/shared/interfaces/i18n.interface";

import styles from "./contacts-status.module.css";
import { zoomInMotion } from "@/src/shared/motion/zoomIn.motion";

type ContactsStatusProps = {
  t: ITranslations;
  total: number;
  isFetching: boolean;
};

const ContactsStatus = ({
  t,
  total,
  isFetching,
}: ContactsStatusProps): JSX.Element => {
  return (
    <div className={styles.status}>
      <motion.span
        key={total}
        className={styles.totalChip}
        {...zoomInMotion(0,0)}
      >
        <Text tag="p" variant="description_xs" color="secondary" weight="semibold" zoomIn>
          {t("pagination.totalResults", { total }) as string}
        </Text>
      </motion.span>

      <AnimatePresence>
        {isFetching && (
          <motion.span
            className={styles.loadingChip}
            {...zoomInMotion(0,0)}
          >
            <FontAwesomeIcon
              icon={faCircleNotch}
              className={styles.spinner}
              aria-hidden="true"
            />
            <span>{t("status.loading") as string}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export { ContactsStatus };
