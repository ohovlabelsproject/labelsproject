import uiLabels from "../../uiLabels";

function NavBtnAlert(props) {
  const { labelsData, labelsMetadata } = props;
  const hasMoreBoards = labelsData && labelsData.labelsArr.length > 9;
  const hasMoreLabels = labelsData && labelsData.labelsArr && hasMoreBoards;
  return hasMoreLabels && !labelsMetadata.labelBeingDisposedOf ? (
    <div className="alert-to-other-boards fade-in-out">
      <div>{uiLabels.instructions.alerts.navAlert.moreLabelsNextBoard}</div>
      <img alt="" src="img/ui/arrow-handdrawn-compressed.png" width="50px" />
    </div>
  ) : null;
}

export default NavBtnAlert;
