import uiLabels from "./uiLabels";

function DebugPanel(props) {
  return (
    <div className="debug-panel">
      orientation:{" "}
      {uiLabels.debug.orientations[props.orientationData?.orientation]}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>device:&nbsp;
      {uiLabels.debug.devices[props.orientationData?.deviceType]}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>h: {props.orientationData?.h}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>w: {props.orientationData?.w}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>overflowY:&nbsp;
      {uiLabels.debug.overflow[props.orientationData?.overflowY]}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>reorient?:&nbsp;
      {props.orientationData?.shouldReorient ? "yes!" : "no"}
    </div>
    /* 
    <span style={{ display: props.showDebugPanel ? "block" : "none" }}>
      Start: {props.labelsMetadata.sliceStart} --- End:{" "}
      {props.labelsMetadata.sliceEnd} --- Pg:{" "}
      {props.labelsMetadata.pageIndex + 1} -- Labels #{" "}
      {props.labelsData?.labelsArr?.length}
    </span>
    */
  );
}

export default DebugPanel;
