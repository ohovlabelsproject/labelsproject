import NavBtnAlert from "./navbtnalert";

function NavBtnR(props) {
  const disableDirection =
    props.labelsMetadata.sliceEnd >
    (props.labelsData && props.labelsData.labelsArr.length - 1
      ? props.labelsData.labelsArr.length - 1
      : 9);

  return props.labelsMetadata.labelBeingDisposedOf ? null : (
    <>
      <NavBtnAlert />
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
