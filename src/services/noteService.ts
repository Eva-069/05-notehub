import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

export interface PaginatedNotes {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

const API_KEY = import.meta.env.VITE_NOTEHUB_TOKEN;

if (!API_KEY) {
  throw new Error("VITE_NOTEHUB_TOKEN is not defined in environment variables");
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api", 
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Check your VITE_NOTEHUB_TOKEN in environment variables");
    }
    return Promise.reject(error);
  }
);

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<PaginatedNotes> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;

  const { data }: AxiosResponse<PaginatedNotes> = await api.get("/notes", {
    params,
  });
  return data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: Note["tag"];
}): Promise<Note> {
  const { data }: AxiosResponse<Note> = await api.post("/notes", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data }: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return data;
}