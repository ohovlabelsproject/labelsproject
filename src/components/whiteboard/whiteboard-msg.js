import { Toast } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function WhiteboardMsg(props) {
  const { labelsMetadata } = props;
  const { successfulBin } = uiLabels.feedback;
  return (
    <div>
      <Toast
        show={labelsMetadata.labelBeingDisposedOf}
        centered
        className="justify-content-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: 0,
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          right: 0,
          zIndex: 9999,
        }}
      >
        <Toast.Body
          style={{
            alignItems: "center",
            background: "#fff",
            borderRadius: 10,
            display: "flex",
            fontFamily: `"Lato", Helvetica, Arial, Lucida, sans-serif`,
            fontSize: 18,
            height: 140,
            justifyContent: "center",
            lineHeight: 1.2,
            top: 0,
          }}
        >
          <div>
            <p style={{ fontWeight: "bold" }}>Thanks!</p>
            <p>{successfulBin.body}</p>
            <div className="col-12 row text-center">
              <div className="col-2 text-center"></div>
              <div className="col-8 text-center">
                <div className="circle-line">
                  <div className="circle-red">&nbsp;</div>
                  <div className="circle-blue">&nbsp;</div>
                  <div className="circle-green">&nbsp;</div>
                  <div className="circle-yellow">&nbsp;</div>
                </div>
              </div>
              <div className="col-2 text-center"></div>
            </div>
          </div>
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
