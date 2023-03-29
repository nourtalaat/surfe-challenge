import { all, put, takeLatest, call } from "redux-saga/effects";
import actions from "../../actions/notes";
import {
  fetchNotesAPIRequest,
  fetchNoteByIdAPIRequest,
  updateNoteAPIRequest,
  createNoteAPIRequest,
} from "../../../api/notes";
import NotesActionTypes from "../../actions/notes/notesActions.types.d";
import { SagaIterator } from "@redux-saga/types";

export function* fetchNotesAsync({ payload }: any): SagaIterator<void> {
  try {
    const notes = yield call(fetchNotesAPIRequest, payload);
    yield put(actions.fetchNotesSucceeded(notes));
  } catch (error) {
    yield put(actions.fetchNotesFailed());
  }
}

export function* fetchNotesByIdAsync({ payload }: any): SagaIterator<void> {
  try {
    const note = yield call(fetchNoteByIdAPIRequest, payload);
    yield put(actions.fetchNoteByIdSucceeded(note.body));
  } catch (error) {
    yield put(actions.fetchNoteByIdFailed());
  }
}

export function* updateNoteByIdAsync({ payload }: any): SagaIterator<void> {
  try {
    const note = yield call(updateNoteAPIRequest, payload);
    yield put(actions.updateNoteSucceeded(note.body));
  } catch (error) {
    yield put(actions.updateNoteFailed());
  }
}

export function* createNoteAsync({ payload }: any): SagaIterator<void> {
  try {
    yield call(createNoteAPIRequest, payload);
    const notes = yield call(fetchNotesAPIRequest, payload);
    yield put(actions.createNoteSucceeded(notes));
  } catch (error) {
    yield put(actions.createNoteFailed());
  }
}

export default function* sagaCollections() {
  yield all([
    takeLatest(NotesActionTypes.FETCH_NOTES_REQUEST, fetchNotesAsync),
    takeLatest(NotesActionTypes.FETCH_NOTE_BY_ID_REQUEST, fetchNotesByIdAsync),
    takeLatest(NotesActionTypes.UPDATE_NOTE_REQUEST, updateNoteByIdAsync),
    takeLatest(NotesActionTypes.CREATE_NOTE_REQUEST, createNoteAsync),
  ]);
}
