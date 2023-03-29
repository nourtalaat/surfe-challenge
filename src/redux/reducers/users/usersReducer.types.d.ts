import { User } from "../../../api/users/types";

type InitialUsers = {
  users: User[];
  mostMentionedUsers: User[];
  isLoading: {
    fetch: boolean;
    fetchMostMentioned: boolean;
  };
  hasError: {
    fetch?: boolean;
    fetchMostMentioned?: boolean;
  };
};

export default InitialUsers;
