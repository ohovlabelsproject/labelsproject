import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function ModalWelcome(props) {
  const [show, setShow] = useState(true);
  const [slideData, setSlideData] = useState({ slide: 0 });

  /* Slides used:
   **********************************/
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

  /* Get consent controls "I will take part", etc.:
   ***********************************************/
  const getNavConsentControls = () => {
    return (
      <Row
        className="boroder text-center justify-content-center"
        style={{ float: "right", width: "100%" }}
      >
        <Col>
          <a href="https://en.wikipedia.org/wiki/Rubber_duck" target="_self">
            <button className="btn-ohov-2">
              {uiLabels.welcome.action.decline}
            </button>
          </a>
        </Col>

        <Col>
          <button className="btn-ohov-welcome" onClick={handleClose}>
            {uiLabels.welcome.action.consent}
          </button>
        </Col>
      </Row>
    );
  };

  /* Get content for the nav buttons on footer:
   ********************************************/
  const getNavFooter = () => {
    return (
      <Row className="text-center justify-content-center">
        <Col></Col>
        <Col>
          <button
            className="btn-ohov-welcome"
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
  };

  /* Get content for the slide body:
   **********************************/
  const getSlideBody = () => {
    return (
      <div id="slide-body-container" style={{ height: 120 }}>
        <div
          id="slide-body-sub-container"
          className="animate__animated animate__fadeIn animate__slow"
        >
          {slides[slideData.slide].body.p}
        </div>
      </div>
    );
  };

  /* Get content for the slide footer:
   **********************************/
  const getSlideFooter = () => {
    const { slide } = slideData;
    switch (slide) {
      case 0: // Slide 0
        return getNavFooter();
      case 1: // Slide 1
        return getNavFooter();
      case 2: // Slide 2
        return getNavConsentControls();
      default:
        return getNavFooter();
    }
  };

  /* Handle the modal being closed:
   **********************************/
  const handleClose = () => {
    setShow(false);
    props.getLabels();
    props.getUserGeolocation();
    props.preventDefaultTouchActions();
  };

  /* Handle the slide being changed:
   **********************************/
  const handleSlideChange = (slideToGoTo) => {
    const slideBodySContainer = document.getElementById(
      "slide-body-sub-container"
    );
    if (slideBodySContainer) {
      // Force CSS animation to reset:
      slideBodySContainer.style.display = "none";
      const st = setTimeout(() => {
        slideBodySContainer.style.display = "block";
        clearTimeout(st);
      }, 100);
    }
    setSlideData((previousState) => {
      return {
        ...previousState,
        slide: slideToGoTo,
      };
    });
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
            style={{
              fontWeight: 400,
              float: "right",
              position: "absolute",
              right: 20,
            }}
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
