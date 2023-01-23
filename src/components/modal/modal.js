import ModalHeader from "./modalheader";
import ModalSubmitBtn from "./modalsubmitbtn";

function ModalWindow() {
  return (
    <>
      {/* 
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Launch static backdrop modal
      </button>*/}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <ModalHeader title="Add label submission form" />
            <div className="modal-body">
              This is your opportunity to submit labels that you find
              stimigising (and/or think may be stimigising to others). Your
              submission could take up to 48 hours to be moderated and appear as
              a sticky note on the webpage/app. Thank you!
              <br />
              <br />
              <label>Your label:</label>
              <input className="form-control"></input>
              <div className="alert alert-sm p-1 alert-danger">ksdldk</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <ModalSubmitBtn />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;
