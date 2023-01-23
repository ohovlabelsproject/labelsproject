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
          <img
            alt="Our Hearing, Our Voice logo"
            src="https://usercontent.one/wp/www.ohov.co.uk/wp-content/uploads/2019/08/OHOV_final_logo_colour-2.png"
            width="130px"
          />
        </div>
      </div>
    </header>
  );
}

export default Hud;
