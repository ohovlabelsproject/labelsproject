import { useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import uiLabels from "../../uiLabels";
import utils from "../utils/utils";
import YoutubeFrame from "../yt/youtubeframe";

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
        title: "Instructional Video",
      },
      body: {
        p: uiLabels.welcome.body.slide2,
        video: {
          url: "QWyrRG62zys",
          title: "Instructional video",
        },
      },
    },
    {
      heading: {
        title: "Consent",
      },
      body: {
        p: uiLabels.welcome.body.slide3,
        terms: uiLabels.termsOfUse.text,
        turnOffCheckbox: true,
      },
    },
  ];

  /* Get consent controls "I will take part", etc.:
   ***********************************************/
  const getNavConsentControls = () => {
    return (
      <Row
        className="justify-content-center text-center"
        style={{ float: "right", width: "100%" }}
      >
        <Col>
          <a href="https://en.wikipedia.org/wiki/Rubber_duck" target="_self">
            <button
              aria-label="Decline and redirect from this site"
              className="btn-ohov-2"
              id="btn-decline"
            >
              {uiLabels.welcome.action.decline}
            </button>
          </a>
        </Col>
        <Col>
          <button
            aria-label="Consent and close modal"
            className="btn-ohov-welcome"
            onClick={handleClose}
          >
            {uiLabels.welcome.action.consent}
          </button>
        </Col>
      </Row>
    );
  };

  const GetP = () => {
    if (slides[slideData.slide].body.p.includes("the instructions")) {
      return (
        <>
          <span>
            {slides[slideData.slide].body.p.split("the instructions")[0]}
          </span>
          <span
            className="btn-link-regular"
            onClick={() => handleSlideChange(1)}
          >
            the instructions
          </span>
          <span>
            {slides[slideData.slide].body.p.split("the instructions")[1]}
          </span>
        </>
      );
    } else {
      return slides[slideData.slide].body.p;
    }
  };
  /* Get content for the nav buttons on footer:
   ********************************************/
  const getNavFooter = () => {
    return (
      <Row className="justify-content-center text-center">
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
      <div id="slide-body-container">
        <div
          id="slide-body-sub-container"
          className="animate__animated animate__fadeIn animate__slow"
        >
          {/* If data has p property, include it here: */}
          {slides[slideData.slide].body.p ? <GetP></GetP> : null}
          {slideData.slide === 0 ? (
            <>
              <br />
              <br />
              <p>{uiLabels.welcome.body.slide1b}</p>
            </>
          ) : null}
          {/* If data has video property, include it here: */}
          {slides[slideData.slide].body.video ? (
            <YoutubeFrame
              autoplay={1}
              title={slides[slideData.slide].body.video.title}
              url={slides[slideData.slide].body.video.url}
            />
          ) : null}
          {slides[slideData.slide].body.terms ? (
            <div className="my-4">
              <textarea
                className="form-control"
                style={{ height: 70, fontSize: 13, fontFamily: "monospace" }}
                value={slides[slideData.slide].body.terms}
              ></textarea>
            </div>
          ) : null}
          {slides[slideData.slide].body.turnOffCheckbox ? (
            <div className="my-4 text-center">
              <small>
                <input type="checkbox" id="toggle-welcome-checkbox" />
                &nbsp; Do not show welcome messages again
              </small>
            </div>
          ) : null}
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
    props.getOrientationData();
    utils.device.touch.preventDefaultTouchActions();
    utils.device.overflow.addOverflowStyleFix();
    utils.device.orientation.update();
    utils.ui.animation.vantaBg.apply();
    utils.ui.welcomeModals.determineSkip();
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
      keyboard={true}
      onEnter={() => {
        if (props.labelsMetadata.skipIntro) {
          handleClose(); // Close immediately if "skipIntro" is true
        }
      }}
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
              float: "right",
              fontWeight: 400,
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
