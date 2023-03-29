import { User } from "../../../api/users/types";

export type Props = {
  users: User[];
  closeDropdown: () => void;
  handleOptionClick: (username: User["username"]) => void;
};
