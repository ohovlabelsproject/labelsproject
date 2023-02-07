import uiLabels from "../../uiLabels";

function NavBtnAlert(props) {
  return props.labelsData &&
    props.labelsData.labelsArr &&
    props.labelsData.labelsArr.length > 9 &&
    !props.labelsMetadata.labelBeingDisposedOf ? (
    <div className="alert-to-other-boards fade-in-out">
      <div>{uiLabels.instructions.alerts.navAlert.moreLabelsNextBoard}</div>
      <img alt="" src="/arrow-handdrawn-compressed.png" width="50px" />
    </div>
  ) : null;
}

export default NavBtnAlert;
