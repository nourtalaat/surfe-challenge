import { Note } from "../../../api/notes/types";

type InitialNotes = {
  notes: Note[];
  body: string | null;
  isLoading: {
    fetch: boolean;
    fetchDetails: boolean;
    update: boolean;
  };
  hasError: {
    fetch?: boolean;
    fetchDetails?: boolean;
    update?: boolean;
    create?: boolean;
  };
};

export default InitialNotes;
