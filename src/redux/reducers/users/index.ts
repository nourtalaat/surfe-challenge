import { ActionsCreators } from "../../actions/notes";
import UsersActionsTypes from "../../actions/users/usersActions.types.d";
import InitialUsers from "./usersReducer.types";

const INITIAL_USERS: InitialUsers = {
  users: [],
  mostMentionedUsers: [],
  isLoading: {
    fetch: true,
    fetchMostMentioned: true,
  },
  hasError: {
    fetch: undefined,
    fetchMostMentioned: undefined,
  },
};

const usersReducer = (state = INITIAL_USERS, action: ActionsCreators) => {
  switch (action.type) {
    case UsersActionsTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        users: [],
        isLoading: { ...state.isLoading, fetch: true },
        hasError: { ...state.hasError, fetch: undefined },
      };

    case UsersActionsTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        isLoading: { ...state.isLoading, fetch: false },
        hasError: { ...state.hasError, fetch: false },
      };

    case UsersActionsTypes.FETCH_USERS_ERROR:
      return {
        ...state,
        isLoading: { ...state.isLoading, fetch: false },
        hasError: { ...state.hasError, fetch: true },
      };

    case UsersActionsTypes.FETCH_MOST_MENTIONED_REQUEST:
      return {
        ...state,
        mostMentionedUsers: [],
        isLoading: { ...state.isLoading, fetchMostMentioned: true },
        hasError: { ...state.hasError, fetchMostMentioned: undefined },
      };

    case UsersActionsTypes.FETCH_MOST_MENTIONED_SUCCESS:
      return {
        ...state,
        mostMentionedUsers: action.payload.users,
        isLoading: { ...state.isLoading, fetchMostMentioned: false },
        hasError: { ...state.hasError, fetchMostMentioned: false },
      };

    case UsersActionsTypes.FETCH_MOST_MENTIONED_ERROR:
      return {
        ...state,
        isLoading: { ...state.isLoading, fetchMostMentioned: false },
        hasError: { ...state.hasError, fetchMostMentioned: true },
      };

    default:
      return state;
  }
};

export default usersReducer;
