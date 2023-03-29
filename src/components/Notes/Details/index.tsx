import { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import UserDropdown from "../../Users/UserDropdown";
import DetailsHeader from "./Header";
import useSendNote from "../../../hooks/notes/useSendNote";
import useGetUsers from "../../../hooks/users/useGetUsers";
import { Props } from "./types";
import { User } from "../../../api/users/types";
import { ExplicitAny } from "../../../type/global";
import "./styles.scss";

const NoteDetails = ({
  body,
  hasFetchMentionedUsersError,
}: Props): React.ReactElement => {
  const [currentValue, setCurrentValue] = useState<string>(body);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const draggingUser = useRef<string>("");
  const indexStart = useRef<number>(0);
  const indexEnd = useRef<number>(0);

  const { updateNote } = useSendNote();
  const { filterUsers, users, hasError } = useGetUsers();

  useEffect(() => {
    if (hasError === false) {
      filterUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError]);

  const handleDroppedUser = () => {
    const finalValue = `${currentValue} @${draggingUser.current}`;
    updateNote(finalValue);
    setCurrentValue(finalValue);
  };

  const handleOptionClick = (option: User["username"]) => {
    const firstPart = currentValue.slice(0, indexStart.current - 1);
    const lastPart = currentValue.slice(indexEnd.current, currentValue.length);

    const finalValue = `${firstPart}@${option} ${lastPart}`;

    setCurrentValue(finalValue);
    updateNote(finalValue);
  };

  const handleNoteOnChange = ({
    target: { value, selectionEnd },
    nativeEvent: { data: char },
  }: ExplicitAny) => {
    if (char === "@") {
      handleOpenDropdown(value, selectionEnd);
    } else if (char === " ") {
      handleOnCloseDropdown();
    }

    setCurrentValue(value);
    debouncedBodyChange(value);

    if (showDropdown) {
      indexEnd.current = selectionEnd;
      debouncedMentionChange(value);
    }
  };

  const handleOpenDropdown = (value: string, index: number) => {
    indexStart.current = index;
    indexEnd.current = index;
    setShowDropdown(true);
  };

  const handleOnCloseDropdown = () => {
    indexStart.current = 0;
    indexEnd.current = 0;
    setShowDropdown(false);
  };

  const filterWithDiff = (value: string) => {
    if (value.charAt(indexStart.current - 1) !== "@") {
      handleOnCloseDropdown();
    } else {
      const diff = value.slice(indexStart.current, indexEnd.current);
      filterUsers(diff);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedBodyChange = useMemo(() => debounce(updateNote, 300), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedMentionChange = useMemo(
    () => debounce(filterWithDiff, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <section className="note-details">
      <DetailsHeader
        setDraggingUser={(username: string) => {
          draggingUser.current = username;
        }}
        hasFetchMentionedUsersError={hasFetchMentionedUsersError}
      />
      <textarea
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDroppedUser}
        id="textArea"
        value={currentValue}
        onChange={handleNoteOnChange}
      />
      {showDropdown ? (
        <UserDropdown
          closeDropdown={() => {
            setShowDropdown(false);
          }}
          users={users}
          handleOptionClick={handleOptionClick}
        />
      ) : null}
    </section>
  );
};

export default NoteDetails;
