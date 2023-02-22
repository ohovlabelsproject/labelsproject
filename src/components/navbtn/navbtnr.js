import NavBtnAlert from "./navbtnalert";

function NavBtnR(props) {
  const { labelsData, labelsMetadata } = props;
  const disableDirection =
    labelsMetadata.sliceEnd >
    (labelsData && labelsData.labelsArr.length - 1
      ? labelsData.labelsArr.length - 1
      : 9);

  return labelsMetadata.labelBeingDisposedOf ? null : (
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
