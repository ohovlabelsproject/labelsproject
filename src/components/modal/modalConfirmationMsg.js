import ModalHeader from "./modalheader";

function ModalConfirmationMsg(props) {
  const beginCountdownToClose = () => {
    //
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#confirmationModal"
      >
        Launch confirmation modal
      </button>
      <div
        className="modal fade"
        id="confirmationModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader title="Successful submission" />
            <form>
              <div className="modal-body">
                <br />
                <p>Thanks for you submission!</p>
              </div>
              <br />
              Closing in (5)
              <br />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmationMsg;
