import { User, UserFromRequest } from "../../../api/users/types";
import { ValueOf } from "../../../type/global.d";
import UsersActionsTypes from "./usersActions.types.d";

const fetchUsersRequest = () => {
  return {
    type: UsersActionsTypes.FETCH_USERS_REQUEST,
  };
};

const fetchUsersSucceeded = (users: User[]) => ({
  type: UsersActionsTypes.FETCH_USERS_SUCCESS,
  payload: { users },
});

const fetchUsersFailed = () => ({
  type: UsersActionsTypes.FETCH_USERS_ERROR,
});

const fetchMostMentionedUsersRequest = () => {
  return {
    type: UsersActionsTypes.FETCH_MOST_MENTIONED_REQUEST,
  };
};

const fetchMostMentionedUsersSucceeded = (users: UserFromRequest[]) => ({
  type: UsersActionsTypes.FETCH_MOST_MENTIONED_SUCCESS,
  payload: { users },
});

const fetchMostMentionedUsersFailed = () => ({
  type: UsersActionsTypes.FETCH_MOST_MENTIONED_ERROR,
});

const actionsCreators = Object.freeze({
  fetchUsersRequest,
  fetchUsersSucceeded,
  fetchUsersFailed,
  fetchMostMentionedUsersRequest,
  fetchMostMentionedUsersSucceeded,
  fetchMostMentionedUsersFailed,
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
