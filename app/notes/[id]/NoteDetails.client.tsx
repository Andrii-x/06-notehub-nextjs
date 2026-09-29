"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import styles from "./note-details.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => fetchNoteById(id),
  });
  if (isLoading)
    return <p className={styles.message}>Loading, please wait...</p>;
  if (isError || !note)
    return <p className={styles.message}>Something went wrong.</p>;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link className={styles.back} href="/notes">
          ← All notes
        </Link>
        <article className={styles.item}>
          <div className={styles.header}>
            <h1>{note.title}</h1>
          </div>
          <p className={styles.tag}>{note.tag}</p>
          <p className={styles.content}>{note.content}</p>
          <p className={styles.date}>
            Created{" "}
            {new Date(note.createdAt).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </p>
        </article>
      </div>
    </main>
  );
}
