import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ModalWelcome(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    props.getLabels();
  };
  // const handleShow = () => setShow(true);

  return (
    <Modal
      centered
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
          Welcome
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          We're trying to find out what labels young people in the courts find
          stigmitising (unfair).
        </p>
        <p>
          On the next page you'll see one or more boards of labels. Drag & drop
          labels you find particularly objectionable into a "bin zone" & it will
          be sent to our database. Your help is greatly appreciated.
        </p>
        <br />
        <Row className="text-center justify-content-center">
          <Col>
            <button className="btn-ohov-2"> No thanks!</button>
          </Col>
          <Col>
            <button className="btn-ohov-1" onClick={handleClose}>
              I will take part
            </button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWelcome;
