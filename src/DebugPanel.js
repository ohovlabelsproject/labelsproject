function DebugPanel(props) {
  return (
    <div className="debug-panel">
      Orientation: {props.orientationData?.orientation}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>Device:
      {props.orientationData?.deviceType}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>h: {props.orientationData?.h}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>w: {props.orientationData?.w}
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>overflow:
      {props.orientationData?.overflow}
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
