import ModalHeader from "./modalheader";
import ModalSubmitBtn from "./modalsubmitbtn";

function ModalWindow(props) {
  return (
    <>
      <div
        className="modal fade"
        id="addLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader title="Add label +" />
            <form>
              <div className="modal-body">
                This is your opportunity to add a label that you find
                stimigising. It will be counted as a submission and potentially
                appear on this app for others*.
                <br />
                <br />
                <label>Your label:</label>
                <input
                  className="form-control modal-label-submission"
                  id="modal-label-submission"
                  minLength={5}
                  maxLength={30}
                ></input>
                <div className="alert alert-sm p-1 alert-danger small">
                  Inappropriate
                </div>
                <small className="text-muted" style={{ fontSize: 11 }}>
                  {/* **Pending moderator approval */}
                  **If the ducks approve
                </small>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-ohov-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <ModalSubmitBtn
                  handleCustomLabelSubmission={
                    props.handleCustomLabelSubmission
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;
