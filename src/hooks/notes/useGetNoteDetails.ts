import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../redux/actions/notes";
import { RootReducerState } from "../../type/global";

const useGetNoteDetails = () => {
  const { session, id } = useParams<{ session: string; id: string }>();
  const dispatch = useDispatch();

  const notesState = useSelector(({ Notes, Users }: RootReducerState) => ({
    body: Notes.body,
    isLoading: Notes.isLoading.fetchDetails,
    hasError: Notes.hasError.fetchDetails,
    hasFetchMentionedUsersError: Users.hasError.fetchMostMentioned,
  }));

  const getNoteById = () => {
    if (session && id) {
      dispatch(actions.fetchNoteByIdRequest({ session, id }));
    }
  };

  return {
    getNoteById,
    session,
    id,
    ...notesState,
  };
};

export default useGetNoteDetails;
