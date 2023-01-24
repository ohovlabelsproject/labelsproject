import ModalHeader from "./modalheader";
import ModalSubmitBtn from "./modalsubmitbtn";

function ModalWindow(props) {
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
        id="modalWelcome"
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
                Explanation here
                <br />
                <input type="checkbox" />
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
