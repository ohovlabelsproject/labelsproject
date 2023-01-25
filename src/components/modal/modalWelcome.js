import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function ModalWelcome(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.getLabels();
  };

  // const handleShow = () => setShow(true);

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
      dialogClassName="modal-90w"
      keyboard={false}
      onHide={() => setShow(false)}
      show={show}
    >
      <Modal.Header>
        <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
          {uiLabels.welcome.header.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{uiLabels.welcome.body.p1}</p>
        <p>{uiLabels.welcome.body.p2}</p>
        <br />
        <Row className="text-center justify-content-center">
          <Col>
            <button className="btn-ohov-2">
              {uiLabels.welcome.action.decline}
            </button>
          </Col>
          <Col>
            <button className="btn-ohov-1" onClick={handleClose}>
              {uiLabels.welcome.action.consent}
            </button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWelcome;
