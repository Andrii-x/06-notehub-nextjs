"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { createNote } from "@/lib/api";
import { noteKeys } from "@/lib/queryKeys";
import type { CreateNotePayload, NoteTag } from "@/types/note";
import styles from "./NoteForm.module.css";

const tags: NoteTag[] = ["Personal", "Work", "Todo", "Meeting", "Shopping"];

const noteSchema: yup.ObjectSchema<CreateNotePayload> = yup.object({
  title: yup
    .string()
    .trim()
    .required("Title is required")
    .max(120, "Title must be 120 characters or fewer"),
  content: yup
    .string()
    .trim()
    .required("Note content is required")
    .max(5000, "Note must be 5000 characters or fewer"),
  tag: yup
    .mixed<NoteTag>()
    .oneOf(tags, "Choose a valid tag")
    .required("Choose a tag"),
});

interface NoteFormProps {
  onClose: () => void;
}

export function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: noteKeys.all }),
  });

  return (
    <Formik
      initialValues={{ title: "", content: "", tag: "Personal" as NoteTag }}
      validationSchema={noteSchema}
      onSubmit={async (values, { resetForm, setStatus }) => {
        try {
          await createMutation.mutateAsync(values);
          resetForm();
          onClose();
        } catch (error) {
          setStatus(
            error instanceof Error ? error.message : "Could not create note.",
          );
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className={styles.form}>
          <label htmlFor="note-title">Title</label>
          <Field
            id="note-title"
            name="title"
            placeholder="Give this note a name"
          />
          <ErrorMessage
            name="title"
            component="p"
            className={styles.fieldError}
          />

          <label htmlFor="note-tag">Tag</label>
          <Field as="select" id="note-tag" name="tag">
            {tags.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="tag"
            component="p"
            className={styles.fieldError}
          />

          <label htmlFor="note-content">Note</label>
          <Field
            as="textarea"
            id="note-content"
            name="content"
            rows={6}
            placeholder="Write down what you want to remember..."
          />
          <ErrorMessage
            name="content"
            component="p"
            className={styles.fieldError}
          />

          {status && (
            <p className={styles.error} role="alert">
              Could not create note. {String(status)}
            </p>
          )}
          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting || createMutation.isPending}
            >
              {isSubmitting ? "Saving..." : "Save note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
