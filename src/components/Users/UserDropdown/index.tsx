import { useEffect } from "react";
import useGetUsers from "../../../hooks/users/useGetUsers";
import { User } from "../../../api/users/types";
import { Props } from "./types";

const UserDropdown = ({
  users,
  closeDropdown,
  handleOptionClick,
}: Props): React.ReactElement => {
  const { getUsers, filterUsers, hasError } = useGetUsers();

  useEffect(() => {
    getUsers();

    window.addEventListener("click", closeDropdown);

    return () => {
      window.removeEventListener("click", closeDropdown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasError === false) {
      filterUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError]);

  return (
    <div
      id="dropdownLeftStart"
      className="position: absolute top-0 z-20 w-80 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
    >
      <ul
        className="py-1 text-xs text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownLeftStartButton"
      >
        {users.map((user: User) => (
          <li
            className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => handleOptionClick(user.username)}
          >
            {user.fullName} | @{user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDropdown;
