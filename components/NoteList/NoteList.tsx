import Link from "next/link";
import type { Note } from "@/types/note";
import styles from "./NoteList.module.css";

type NoteListProps = {
  notes: Note[];
  onDelete: (id: string) => void;
  deleting: boolean;
};
export function NoteList({ notes, onDelete, deleting }: NoteListProps) {
  if (!notes.length)
    return (
      <div className={styles.empty}>
        <span className={styles.emptyMark} aria-hidden="true">
          ∅
        </span>
        <p>No notes found. Create one to get started.</p>
      </div>
    );
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li className={styles.item} key={note.id}>
          <div className={styles.topline}>
            <span className={styles.tag}>{note.tag}</span>
            <time className={styles.date} dateTime={note.createdAt}>
              {new Date(note.createdAt).toLocaleDateString()}
            </time>
          </div>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.actions}>
            <Link
              className={styles.details}
              href={`/notes/${encodeURIComponent(note.id)}`}
            >
              View details <span aria-hidden="true">↗</span>
            </Link>
            <button
              className={styles.delete}
              type="button"
              disabled={deleting}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
