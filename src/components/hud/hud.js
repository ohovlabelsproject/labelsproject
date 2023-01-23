function Hud() {
  return (
    <header className="hud">
      <div className="col-12 row">
        <div className="col-4 hud-col-l pl-2">
          <button className="btn-ohov-1">
            Add label &nbsp;
            <i className="fa fa-plus"></i>
          </button>
        </div>
        <div className="col-8 hud-col-r">
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
