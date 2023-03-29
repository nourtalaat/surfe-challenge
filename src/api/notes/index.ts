import { NOTES_ENDPOINT, NOTE_BY_ID_ENDPOINT } from "./endpoints";
import httpClient from "../../config/HttpClient";
import {
  NotesPayload,
  NoteByIdPayload,
  UpdateNotePayload,
} from "./types.d";

const axiosInstance = httpClient();

export const fetchNotesAPIRequest = async ({ session }: NotesPayload) => {
  try {
    const response = await axiosInstance.get(NOTES_ENDPOINT(session));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNoteByIdAPIRequest = async ({
  session,
  id,
}: NoteByIdPayload) => {
  try {
    const response = await axiosInstance.get(NOTE_BY_ID_ENDPOINT(session, id));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNoteAPIRequest = async ({
  session,
  id,
  body,
}: UpdateNotePayload) => {
  try {
    const response = await axiosInstance.put(NOTE_BY_ID_ENDPOINT(session, id), {
      body,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNoteAPIRequest = async ({ session }: NotesPayload) => {
  try {
    const response = await axiosInstance.post(NOTES_ENDPOINT(session), {
      body: " ",
    });
    return response;
  } catch (error) {
    throw error;
  }
};
