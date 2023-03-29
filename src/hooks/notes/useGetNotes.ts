import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import actions from "../../redux/actions/notes";
import { RootReducerState } from "../../type/global";

const useGetNotes = () => {
  const { session } = useParams<{ session: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  const notesState = useSelector(({ Notes }: RootReducerState) => ({
    notes: Notes.notes,
    isLoading: Notes.isLoading.fetch,
    hasError: Notes.hasError.fetch,
  }));

  const getNotes = () => {
    if (session) {
      dispatch(actions.fetchNotesRequest({ session }));
    }
  };

  const redirectToList = () => {
    history.push(`/${session}`);
  };

  return {
    getNotes,
    redirectToList,
    ...notesState,
  };
};

export default useGetNotes;
