"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import type { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });

  return (
    <>
      {deleteMutation.isError && (
        <p className={styles.error} role="alert">
          Could not delete this note. {deleteMutation.error.message}
        </p>
      )}
      {notes.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyMark} aria-hidden="true">
            ∅
          </span>
          <p>No notes found. Create one to get started.</p>
        </div>
      ) : (
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
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(note.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
