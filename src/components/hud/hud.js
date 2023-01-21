function Hud() {
  return (
    <header className="hud">
      <div className="col-12 row">
        <div className="col-4 hud-col-l">
          <button className="btn btn-primary">
            add label &nbsp;
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="col-8 hud-col-r">test text</div>
      </div>
    </header>
  );
}

export default Hud;
