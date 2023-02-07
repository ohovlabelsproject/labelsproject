import uiLabels from "../../../uiLabels";

function NoLabels(props) {
  return props.labelsData && props.labelsData.labelsArr.length <= 0 ? (
    <div className="stickyzone-no-labels-msg">
      {uiLabels.noLabelsToLoad.msg}
    </div>
  ) : null;
}

export default NoLabels;
