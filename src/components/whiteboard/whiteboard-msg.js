import uiLabels from "../../uiLabels";

function WhiteboardMsg(props) {
  const { labelsMetadata } = props;
  const { successfulBin } = uiLabels.feedback;
  return (
    <div
      style={{
        display: labelsMetadata.labelBeingDisposedOf ? "flex" : "none",
      }}
      className={`whiteboard-msg-wrapper modal-dialog modal-dialog-centered animate__animated ${
        labelsMetadata.labelBeingDisposedOf
          ? "animate__fadeInDownBig"
          : "animate__fadeOutUpBig"
      } `}
    >
      <div className="whiteboard-msg-text-wrapper col-12 row p-0 m-0">
        <div className="col-12">
          <p className="whiteboard-msg-thanks">
            <i className={successfulBin.headerIcon}></i>&nbsp;
            {successfulBin.header}
          </p>
          <p>{successfulBin.body}</p>
        </div>
      </div>
    </div>
  );
}

export default WhiteboardMsg;
