import NoteCard from "./NoteCard";
import useSendNote from "../../../hooks/notes/useSendNote";
import { Props } from "./types";
import "./styles.scss";

const NotesList = ({ notes }: Props): React.ReactElement => {
  const { createNote } = useSendNote();

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteCard {...note} key={note.id} />
      ))}
      <button onClick={() => createNote()}>New</button>
    </section>
  );
};

export default NotesList;
