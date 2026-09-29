"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { Modal } from "@/components/Modal/Modal";
import { NoteForm } from "@/components/NoteForm/NoteForm";
import { NoteList } from "@/components/NoteList/NoteList";
import { Pagination } from "@/components/Pagination/Pagination";
import { SearchBox } from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import styles from "./notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearch = useDebounce(search);
  const notesQuery = useQuery({
    queryKey: noteKeys.list(debouncedSearch, page),
    queryFn: () => fetchNotes({ search: debouncedSearch, page }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
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
          <button
            className={styles.newNoteButton}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <span aria-hidden="true">＋</span> New note
          </button>
        </div>
        <Modal
          open={isModalOpen}
          title="New note"
          eyebrow="Make a little room"
          onClose={() => setIsModalOpen(false)}
        >
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
        <SearchBox value={search} onChange={handleSearchChange} />
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
            <NoteList notes={notesQuery.data.notes} />
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
