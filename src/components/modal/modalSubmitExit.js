import { Modal } from "react-bootstrap";

function ModalSubmitExit(props) {
  const handleClose = () => props.setShowSubmitExitModal(false);
  return (
    <>
      <Modal
        dialogClassName="modal-90w"
        centered
        show={props.showSubmitExitModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thank you!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="animate__animated animate__fadeIn animate__slow">
          <p>
            {localStorage.getItem("ohov_recent_submission")
              ? `"${localStorage.getItem("ohov_recent_submission")}"`
              : "Your label"}{" "}
            was successfully submitted.
          </p>
          <ul style={{ fontSize: 18 }}>
            <li style={{ marginBottom: 0 }}>
              It will appear on the app <b>after</b> moderator approval.
            </li>
            <li>It will be counted as you "binning" it.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <p
            className="text-muted pb-4"
            style={{ fontSize: 16, fontStyle: "italic" }}
          >
            Remember there is support out there if you need it.{" "}
            <a
              href="https://www.ohov.co.uk/contact-us/getting-help-and-support/"
              rel="noreferrer"
              target="_blank"
            >
              Click here
            </a>{" "}
            for support and advice services for children and young people in the
            Scottish Hearings System.
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalSubmitExit;
