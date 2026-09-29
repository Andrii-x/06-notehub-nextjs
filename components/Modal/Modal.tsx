"use client";

import type { ReactNode } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  open: boolean;
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ open, title, eyebrow, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.header}>
          <div>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            <h2 id="modal-title">{title}</h2>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
