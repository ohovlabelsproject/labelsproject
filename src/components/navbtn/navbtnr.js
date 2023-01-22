function NavBtnR(props) {
  const disableDirection = props.labelsMetadata.sliceEnd > props.maxLabels;
  return (
    <div
      className={`nav-r-btn-wrapper ${
        disableDirection ? "nav-btn-disable" : ""
      }`}
      onClick={() => (disableDirection ? null : props.handleNavClick(1))}
    >
      <i className="fa fa-chevron-right"></i>
    </div>
  );
}

export default NavBtnR;
