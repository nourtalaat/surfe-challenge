import "../styles.scss";

const NoSessionState = (): React.ReactElement => {
  return (
    <section className="state">
      <div>
        <h2 className="mb-4 text-6xl font-extrabold">
          To see a session, add it to the url!
        </h2>
      </div>
    </section>
  );
};

export default NoSessionState;
