import "../styles.scss";

const ErrorState = (): React.ReactElement => {
  return (
    <section className="state">
      <div>
        <h2 className="mb-4 text-6xl font-extrabold">
          Something wrong happened
        </h2>
      </div>
    </section>
  );
};

export default ErrorState;
