import { ActionsCreators } from "../../actions/notes";
import NotesActionsTypes from "../../actions/notes/notesActions.types.d";
import InitialNotes from "./notesReducer.types";

const INITIAL_NOTES: InitialNotes = {
  notes: [],
  body: null,
  isLoading: {
    fetch: true,
    fetchDetails: true,
    update: true,
  },
  hasError: {
    fetch: undefined,
    fetchDetails: undefined,
    update: undefined,
    create: undefined,
  },
};

const notesReducer = (state = INITIAL_NOTES, action: ActionsCreators) => {
  switch (action.type) {
    case NotesActionsTypes.FETCH_NOTES_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: true,
          fetchDetails: true,
        },
        hasError: {
          ...state.hasError,
          fetch: undefined
        },
      };

    case NotesActionsTypes.FETCH_NOTES_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: false,
        },
        hasError: {
          ...state.hasError,
          fetch: false,
        },
        notes: action.payload.notes,
      };

    case NotesActionsTypes.FETCH_NOTES_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: false,
        },
        hasError: {
          ...state.hasError,
          fetch: true,
        },
      };

    case NotesActionsTypes.FETCH_NOTE_BY_ID_REQUEST:
      return {
        ...state,
        body: null,
        isLoading: {
          ...state.isLoading,
          fetch: true,
          fetchDetails: true,
        },
        hasError: {
          ...state.hasError,
          fetchDetails: undefined,
        },
      };

    case NotesActionsTypes.FETCH_NOTE_BY_ID_SUCCESS:
      return {
        ...state,
        body: action.payload.body,
        isLoading: {
          ...state.isLoading,
          fetchDetails: false,
        },
        hasError: {
          ...state.hasError,
          fetchDetails: false,
        },
      };

    case NotesActionsTypes.FETCH_NOTE_BY_ID_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetchDetails: false,
        },
        hasError: {
          ...state.hasError,
          fetchDetails: true,
        },
      };

    case NotesActionsTypes.UPDATE_NOTE_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          update: true,
        },
        hasError: {
          ...state.hasError,
          update: undefined,
        },
      };

    case NotesActionsTypes.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        body: action.payload.body,
        isLoading: {
          ...state.isLoading,
          update: false,
        },
        hasError: {
          ...state.hasError,
          update: false,
        },
      };

    case NotesActionsTypes.UPDATE_NOTE_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          update: false,
        },
        hasError: {
          ...state.hasError,
          update: true,
        },
      };

    case NotesActionsTypes.CREATE_NOTE_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: true,
        },
        hasError: {
          ...state.hasError,
          create: undefined,
        },
      };

    case NotesActionsTypes.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: false,
        },
        hasError: {
          ...state.hasError,
          create: false,
        },
        notes: action.payload.notes,
      };

    case NotesActionsTypes.CREATE_NOTE_ERROR:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          fetch: false,
        },
        hasError: {
          ...state.hasError,
          create: true,
        },
      };

    default:
      return state;
  }
};

export default notesReducer;
