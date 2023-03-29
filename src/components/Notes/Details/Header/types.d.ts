import { User } from "../../../../api/users/types";

export type Props = {
    setDraggingUser: (user: User["username"]) => void;
    hasFetchMentionedUsersError: boolean;
};
