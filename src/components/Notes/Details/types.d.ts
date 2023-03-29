import { Note } from "../../../api/notes/types";

export type Props = {
  body: Note["body"];
  hasFetchMentionedUsersError: boolean;
};
