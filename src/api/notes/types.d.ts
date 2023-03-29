export type NotesPayload = {
  session: string;
};

export type NoteByIdPayload = {
  session: string;
  id: string;
};

export type UpdateNotePayload = {
  session: string;
  id: string;
  body: string;
};

export type Note = { id: string; body: string };
