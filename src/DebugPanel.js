function DebugPanel(props) {
  return (
    <span style={{ display: props.showDebugPanel ? "block" : "none" }}>
      Start: {props.labelsMetadata.sliceStart} --- End:{" "}
      {props.labelsMetadata.sliceEnd} --- Pg:{" "}
      {props.labelsMetadata.pageIndex + 1} -- Labels #{" "}
      {props.labelsData?.labelsArr?.length}
    </span>
  );
}

export default DebugPanel;
