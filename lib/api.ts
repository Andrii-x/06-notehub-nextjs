import axios from "axios";
import type { NotesPage } from "@/types/api";
import type { CreateNotePayload, Note } from "@/types/note";

const notesApi = axios.create({
	baseURL: "https://notehub-public.goit.study/api",
});

notesApi.interceptors.request.use((config) => {
	const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

type NotesResponse = Note[] | { notes: Note[]; totalPages?: number };

export async function fetchNotes({
	search = "",
	page = 1,
	perPage = 12,
}: {
	search?: string;
	page?: number;
	perPage?: number;
} = {}): Promise<NotesPage> {
	const { data } = await notesApi.get<NotesResponse>("/notes", {
		params: { search: search.trim() || undefined, page, perPage },
	});
	if (Array.isArray(data)) return { notes: data, totalPages: 1 };
	return { notes: data.notes, totalPages: data.totalPages ?? 1 };
}

export async function fetchNoteById(id: string): Promise<Note> {
	const { data } = await notesApi.get<Note>(`/notes/${encodeURIComponent(id)}`);
	return data;
}

export async function createNote(note: CreateNotePayload): Promise<Note> {
	const { data } = await notesApi.post<Note>("/notes", note);
	return data;
}

export async function deleteNote(id: string): Promise<void> {
	await notesApi.delete(`/notes/${encodeURIComponent(id)}`);
}
