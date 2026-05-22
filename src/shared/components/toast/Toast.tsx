import { useEffect, useSyncExternalStore, type JSX } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleNotch,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useToastStore } from "@/src/shared/stores/toast.store";
import { ITranslations } from "@/src/shared/interfaces/i18n.interface";

import styles from "./toast.module.css";

const AUTO_DISMISS_MS = 5000;

type ToastProps = { t: ITranslations };

const Toast = ({ t }: ToastProps): JSX.Element | null => {
  const status = useToastStore((state) => state.status);
  const message = useToastStore((state) => state.message);
  const id = useToastStore((state) => state.id);
  const hide = useToastStore((state) => state.hide);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const timer = window.setTimeout(hide, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [status, id, hide]);

  if (!mounted) return null;

  const isLoading = status === "loading";
  const icon =
    status === "loading"
      ? faCircleNotch
      : status === "success"
        ? faCircleCheck
        : faTriangleExclamation;

  const defaultMessage =
    status === "loading"
      ? (t("toast.loading") as string)
      : status === "success"
        ? (t("toast.success") as string)
        : status === "error"
          ? (t("toast.error") as string)
          : "";

  return createPortal(
    <AnimatePresence>
      {status && (
        <motion.div
          key={id}
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className={styles.toast}
          initial={{ opacity: 0, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
        >
          <span
            className={`${styles.toast__icon} ${styles[`toast__icon--${status}`]}`}
          >
            <FontAwesomeIcon icon={icon} aria-hidden="true" />
          </span>

          <p className={styles.toast__message}>{message ?? defaultMessage}</p>

          {!isLoading && (
            <button
              type="button"
              className={styles.toast__close}
              onClick={hide}
              aria-label={t("toast.close") as string}
            >
              <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
          )}

          {!isLoading && (
            <motion.span
              className={`${styles.toast__progress} ${styles[`toast__progress--${status}`]}`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: AUTO_DISMISS_MS / 1000, ease: "linear" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export { Toast };
