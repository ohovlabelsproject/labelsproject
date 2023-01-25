import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function ModalWelcome(props) {
  const slides = [
    {
      heading: {
        title: uiLabels.welcome.header.title,
      },
      body: {
        p: uiLabels.welcome.body.slide1,
      },
    },
    {
      heading: {
        title: uiLabels.welcome.header.title,
      },
      body: {
        p: uiLabels.welcome.body.slide2,
      },
    },
    {
      heading: {
        title: uiLabels.welcome.header.title,
      },
      body: {
        p: uiLabels.welcome.body.slide3,
      },
    },
  ];
  //
  const [show, setShow] = useState(true);
  const [slideData, setSlideData] = useState({ slide: 0 });

  const handleClose = () => {
    setShow(false);
    props.getLabels();
  };

  // const handleShow = () => setShow(true);

  const getSlideBody = () => {
    return (
      <div
        className="animate__animated animate__fadeIn animate__slow"
        style={{ height: 120 }}
      >
        {slides[slideData.slide].body.p}
      </div>
    );
  };

  const handleSlideChange = (slideToGoTo) => {
    setSlideData((previousState) => {
      return {
        ...previousState,
        slide: slideToGoTo,
      };
    });
  };

  const getSlideFooter = () => {
    if (slideData.slide === 0) {
      return (
        <Row className="text-center justify-content-center">
          <Col></Col>
          <Col>
            <button
              className="btn-ohov-1"
              style={{ float: "right" }}
              onClick={() => {
                handleSlideChange((slideData.slide += 1));
              }}
            >
              Next <i className="fa fa-chevron-right" />
            </button>
          </Col>
        </Row>
      );
    } else if (slideData.slide === 1) {
      return (
        <Row className="text-center justify-content-center">
          <Col></Col>
          <Col>
            <button
              className="btn-ohov-1"
              style={{ float: "right" }}
              onClick={() => {
                handleSlideChange((slideData.slide += 1));
              }}
            >
              Next <i className="fa fa-chevron-right" />
            </button>
          </Col>
        </Row>
      );
    } else if (slideData.slide === 2) {
      return (
        <Row
          className="text-center justify-content-center"
          style={{ float: "right", width: 340 }}
        >
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
      );
    }
  };
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
          <div className="" style={{ float: "left" }}>
            {slides[slideData.slide].heading.title}
          </div>
          <div
            className="text-muted"
            style={{ float: "right", position: "absolute", right: 20 }}
          >
            {`(${slideData.slide + 1 + "/" + slides.length})`}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getSlideBody()}

        <br />
        {getSlideFooter()}
      </Modal.Body>
    </Modal>
  );
}

export default ModalWelcome;
