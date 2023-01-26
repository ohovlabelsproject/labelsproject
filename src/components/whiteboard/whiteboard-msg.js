import { Toast } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function WhiteboardMsg(props) {
  const { labelsMetadata } = props;
  const { successfulBin } = uiLabels.feedback;
  return (
    <div>
      <Toast
        show={labelsMetadata.labelBeingDisposedOf}
        style={{
          position: "absolute",
          zIndex: 999,
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Toast.Header style={{ background: "#fff" }}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{successfulBin.header}</strong>
        </Toast.Header>
        <Toast.Body
          style={{
            background: "white",
            height: 140,
            fontFamily: "Lato, Helvetica",
            fontSize: 20,
            lineHeight: 1.2,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>{successfulBin.body}</p>
        </Toast.Body>
      </Toast>
    </div>
  );

  /*
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
    </div>*/
}

export default WhiteboardMsg;
