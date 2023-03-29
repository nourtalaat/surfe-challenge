import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import actions from "../../redux/actions/notes";
import { NOTES_BY_ID_PATH } from "../../constants/routes";
import { Note } from "../../api/notes/types";
import { RootReducerState } from "../../type/global";

const useSendNote = () => {
  const { session, id } = useParams<{ session: string; id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const notesState = useSelector(({ Notes }: RootReducerState) => ({
    isUpdating: Notes.isLoading.update,
    hasUpdateError: Notes.hasError.update,
  }));

  const updateNote = (body: Note["body"]) => {
    dispatch(actions.updateNoteRequest({ session, id, body }));
  };

  const createNote = () => {
    dispatch(actions.createNoteRequest({ session }));
  };

  const redirectToNote = (id: Note["id"]) => {
    history.push(NOTES_BY_ID_PATH(session, id));
  };

  return {
    updateNote,
    createNote,
    redirectToNote,
    ...notesState,
  };
};

export default useSendNote;
