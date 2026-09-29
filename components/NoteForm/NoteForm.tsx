"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import type { NoteTag } from "@/types/note";
import styles from "./NoteForm.module.css";

const tags: NoteTag[] = ["Personal", "Work", "Todo", "Meeting", "Shopping"];
export function NoteForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Personal");
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: noteKeys.all });
      setTitle("");
      setContent("");
      setTag("Personal");
      setIsOpen(false);
    },
  });
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createMutation.mutate({
      title: title.trim(),
      content: content.trim(),
      tag,
    });
  }
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.openButton}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <span aria-hidden="true">＋</span> New note
      </button>
      {isOpen && (
        <div
          className={styles.backdrop}
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-note-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.eyebrow}>Make a little room</p>
                <h2 id="new-note-title">New note</h2>
              </div>
              <button
                className={styles.closeButton}
                type="button"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="note-title">Title</label>
              <input
                id="note-title"
                required
                maxLength={120}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Give this note a name"
              />
              <label htmlFor="note-tag">Tag</label>
              <select
                id="note-tag"
                value={tag}
                onChange={(event) => setTag(event.target.value as NoteTag)}
              >
                {tags.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor="note-content">Note</label>
              <textarea
                id="note-content"
                required
                rows={6}
                maxLength={5000}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write down what you want to remember..."
              />
              {createMutation.isError && (
                <p className={styles.error} role="alert">
                  Could not create note. {createMutation.error.message}
                </p>
              )}
              <div className={styles.actions}>
                <button
                  className={styles.cancelButton}
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={styles.submitButton}
                  type="submit"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Saving..." : "Save note"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
