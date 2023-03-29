export const NOTES_ENDPOINT = (session: string) => `${session}/notes`;
export const NOTE_BY_ID_ENDPOINT = (session: string, id: string) =>
  `${session}/notes/${id}`;
