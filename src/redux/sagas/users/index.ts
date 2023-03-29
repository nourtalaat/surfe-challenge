import { all, put, takeLatest, call } from "redux-saga/effects";
import actions from "../../actions/users";
import {
  fetchUsersAPIRequest,
  fetchMostMentionedUsersAPIRequest,
} from "../../../api/users";
import UsersActionTypes from "../../actions/users/usersActions.types.d";
import { SagaIterator } from "@redux-saga/types";
import { UserFromRequest } from "../../../api/users/types";

export function* fetchUsersAsync(): SagaIterator<void> {
  try {
    const response = yield call(fetchUsersAPIRequest);
    const cleanUsers = response.map((user: UserFromRequest) => ({
      username: user.username,
      fullName: `${user.first_name} ${user.last_name}`,
    }));
    yield put(actions.fetchUsersSucceeded(cleanUsers));
  } catch (error) {
    yield put(actions.fetchUsersFailed());
  }
}

export function* fetchMostMentionedUsersAsync(): SagaIterator<void> {
  try {
    const users = yield call(fetchMostMentionedUsersAPIRequest);
    yield put(actions.fetchMostMentionedUsersSucceeded(users));
  } catch (error) {
    yield put(actions.fetchMostMentionedUsersFailed());
  }
}

export default function* sagaCollections() {
  yield all([
    takeLatest(UsersActionTypes.FETCH_USERS_REQUEST, fetchUsersAsync),
    takeLatest(
      UsersActionTypes.FETCH_MOST_MENTIONED_REQUEST,
      fetchMostMentionedUsersAsync
    ),
  ]);
}
