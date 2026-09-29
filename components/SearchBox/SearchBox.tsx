"use client";

import styles from "./SearchBox.module.css";

type SearchBoxProps = {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  label?: string;
  placeholder?: string;
};

export function SearchBox({
  value,
  onChange,
  id = "note-search",
  label = "Search your notes",
  placeholder = "Try a title, tag, or keyword...",
}: SearchBoxProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
          ⌕
        </span>
        <input
          className={styles.input}
          id={id}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
