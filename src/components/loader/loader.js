function Loader() {
  return (
    <div className="loader" style={{ display: "block" }}>
      <div className="loader-circle">
        <p className="loader-content">Loading</p>
        <div className="loader-line-mask">
          <div className="loader-line"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
