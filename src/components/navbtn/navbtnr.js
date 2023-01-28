function NavBtnR(props) {
  const disableDirection =
    props.labelsMetadata.sliceEnd >
    (props.labelsData && props.labelsData.labelsArr.length - 1
      ? props.labelsData.labelsArr.length - 1
      : 9);
  return (
    <>
      {props.labelsData && props.labelsData.labelsArr ? (
        <div className="alert-to-other-boards fade-in-out">
          <div>more on next boards!</div>
          <img alt="" src="/arrow-handdrawn-compressed.png" width="50px" />
        </div>
      ) : null}
      <div
        className={`nav-r-btn-wrapper ${
          disableDirection ? "nav-btn-disable" : ""
        }`}
        onClick={() => (disableDirection ? null : props.handleNavClick(1))}
      >
        <i className="fa fa-chevron-right"></i>
      </div>
    </>
  );
}

export default NavBtnR;
