"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { NoteList } from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { deleteNote, fetchNotes } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import styles from "./notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const notesQuery = useQuery({
    queryKey: noteKeys.list(search, page),
    queryFn: () => fetchNotes({ search, page }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });
  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }
  return (
    <main className={styles.main}>
      <section className={styles.container} aria-labelledby="notes-title">
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>Your workspace</p>
            <h1 className={styles.title} id="notes-title">
              Notes{" "}
              <span className={styles.count}>
                {notesQuery.data?.notes.length ?? ""}
              </span>
            </h1>
          </div>
          <NoteForm />
        </div>
        <SearchBox value={search} onChange={handleSearchChange} />
        {deleteMutation.isError && (
          <p className={styles.error} role="alert">
            Could not delete this note. {deleteMutation.error.message}
          </p>
        )}
        {notesQuery.isLoading && (
          <p className={styles.status}>Loading, please wait...</p>
        )}
        {notesQuery.isError && (
          <p className={styles.error} role="alert">
            Could not fetch the list of notes. {notesQuery.error.message}
          </p>
        )}
        {notesQuery.data && (
          <>
            <NoteList
              notes={notesQuery.data.notes}
              onDelete={(id) => deleteMutation.mutate(id)}
              deleting={deleteMutation.isPending}
            />
            <Pagination
              currentPage={page}
              totalPages={notesQuery.data.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}
