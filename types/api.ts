import type { Note } from "./note";

export interface NotesPage {
  notes: Note[];
  totalPages: number;
}
