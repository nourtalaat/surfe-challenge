import { useEffect } from "react";
import HeaderStatus from "./Status";
import { UserFromRequest } from "../../../../api/users/types";
import useGetNotes from "../../../../hooks/notes/useGetNotes";
import useGetMostMentionedUsers from "../../../../hooks/users/useGetMostMentionedUsers";
import { Props } from "./types.d";

const DetailsHeader = ({
  setDraggingUser,
  hasFetchMentionedUsersError,
}: Props): React.ReactElement => {
  const { redirectToList } = useGetNotes();
  const { getMostMentionedUsers, mostMentionedUsers } =
    useGetMostMentionedUsers();

  useEffect(() => {
    getMostMentionedUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderMostMentionedUsers = () => {
    if (hasFetchMentionedUsersError) {
      return (
        <span className="note-details__mentioned-users-error">
          Couldn't load most mentioned users
        </span>
      );
    }

    return mostMentionedUsers.map((user: UserFromRequest) => (
      <div
        key={user.username}
        className="note-details__mentioned-users-item text-xs"
        draggable="true"
        onDragStart={() => {
          setDraggingUser(user.username);
        }}
      >
        {createTagContent(user)}
      </div>
    ));
  };

  const createTagContent = (user: UserFromRequest) =>
    `${user.first_name} ${user.last_name} | @${user.username}`;

  return (
    <div className="note-details__header">
      <div className="note-details__mentioned-users-container">
        {renderMostMentionedUsers()}
      </div>
      <div className="note-details__actions">
        <button onClick={() => redirectToList()}>Back</button>
        <HeaderStatus />
      </div>
    </div>
  );
};

export default DetailsHeader;
