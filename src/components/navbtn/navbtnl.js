function NavBtnL(props) {
  const disableDirection = props.labelsMetadata.sliceStart <= 0;
  return (
    <div
      className={`nav-l-btn-wrapper ${
        disableDirection ? "nav-btn-disable" : ""
      }`}
      onClick={() => (disableDirection ? null : props.handleNavClick(0))}
    >
      <i className="fa fa-chevron-left"></i>
    </div>
  );
}

export default NavBtnL;
