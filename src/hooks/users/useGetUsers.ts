import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../api/users/types";
import actions from "../../redux/actions/users";
import { RootReducerState } from "../../type/global";

interface FilteredUsers {
  users: User[];
  filter?: string;
}

const useGetUsers = () => {
  const dispatch = useDispatch();
  const [filteredUsers, setFilteredUsers] = useState<FilteredUsers>({
    users: [],
    filter: undefined,
  });

  const usersState = useSelector(({ Users }: RootReducerState) => ({
    users: Users.users,
    isLoading: Users.isLoading.fetch,
    hasError: Users.hasError.fetch,
  }));

  const getUsers = () => {
    dispatch(actions.fetchUsersRequest());
  };

  const filterUsers = (filter?: string) => {
    let filteredResult: User[] = [...usersState.users];
    if (filter) {
      filteredResult = filteredResult.filter(
        (user: User) =>
          user.username.includes(filter) || user.fullName.includes(filter)
      );
    }

    setFilteredUsers({ users: filteredResult.slice(0, 5), filter });
  };

  return {
    getUsers,
    filterUsers,
    users: filteredUsers.users,
    isLoading: usersState.isLoading,
    hasError: usersState.hasError,
  };
};

export default useGetUsers;
