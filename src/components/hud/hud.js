function Hud() {
  return (
    <header className="hud">
      <div className="col-12 row">
        <div className="col-5 hud-col-l pl-1">
          <button
            className="btn-ohov-1"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Add label &nbsp;
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="col-7 hud-col-r">
          <a rel="noreferrer" href="http://www.ohov.co.uk" target="_blank">
            <img
              alt="Our Hearing, Our Voice logo"
              src="/ohov-logo.png"
              width="130px"
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Hud;
