import { useEffect } from "react";
import NotesList from "../../components/Notes/List";
import EmptyState from "../../components/States/Empty";
import ErrorState from "../../components/States/Error";
import LoadingState from "../../components/States/Loading";
import useGetNotes from "../../hooks/notes/useGetNotes";
import useSendNote from "../../hooks/notes/useSendNote";

const List = (): React.ReactElement => {
  const { getNotes, notes, isLoading, hasError } = useGetNotes();
  const { createNote } = useSendNote();

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (true) {
    case isLoading:
      return <LoadingState />;
    case hasError:
      return <ErrorState />;
    case notes.length === 0:
      return (
        <EmptyState
          title="There are no notes"
          buttonTitle="Create new note"
          onClick={() => createNote()}
        />
      );
    default:
      return <NotesList notes={notes} />;
  }
};

export default List;
