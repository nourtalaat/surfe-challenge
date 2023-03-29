import { Note } from "../../../../api/notes/types";
import useSendNote from "../../../../hooks/notes/useSendNote";
import "./styles.scss";

const NoteCard = ({ body, id }: Note): React.ReactElement => {
  const { redirectToNote } = useSendNote();

  return (
    <div className="note-card" onClick={() => redirectToNote(id)}>
      {body}
    </div>
  );
};

export default NoteCard;
