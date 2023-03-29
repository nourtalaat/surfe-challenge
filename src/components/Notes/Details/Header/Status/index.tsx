import useSendNote from "../../../../../hooks/notes/useSendNote";

const HeaderStatus = () => {
  const { isUpdating, hasUpdateError } = useSendNote();

  const config = {
    className: "success",
    text: "Saved",
  };

  switch (true) {
    case isUpdating:
      config.className = "updating";
      config.text = "Saving";
      break;

    case hasUpdateError:
      config.className = "error";
      config.text = "Not saved";
      break;
  }

  return <div className={`status-tag ${config.className} text-xs`}>{config.text}</div>;
};

export default HeaderStatus;
