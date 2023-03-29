import { Props } from "./types";
import "../styles.scss";
import "./styles.scss";

const EmptyState = ({ title, buttonTitle, onClick }: Props): React.ReactElement => {
  return (
    <section className="state">
      <div>
        <h2 className="mb-4 text-6xl font-extrabold">{title}</h2>
        <button onClick={onClick}>{buttonTitle}</button>
      </div>
    </section>
  );
};

export default EmptyState;
