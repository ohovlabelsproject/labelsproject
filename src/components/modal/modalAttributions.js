import { Modal } from "react-bootstrap";
import uiLabels from "../../uiLabels";

function ModalAttributions(props) {
  const handleClose = () => props.setShowAttributions(false);
  // const handleShow = () => props.setShowAttributions(true);
  const attributions = [
    {
      type: "Graphics",
      urls: [
        "https://www.pexels.com/photo/photo-of-orange-dump-truck-toy-1186477/",
        "https://www.pexels.com/photo/yellow-duck-toy-beside-green-duck-toy-132464/",
        "https://www.vecteezy.com/vector-art/2219838-set-of-hand-drawn-arrow-doodles-on-white-background",
        "https://www.stickpng.com/img/miscellaneous/crumpled-paper/crumpled-paper-ball",
        "https://www.clipartmax.com/download/m2i8N4b1N4N4K9G6_computer-geek-rubber-duck-rubber-duck/",
      ],
    },
    {
      type: "Videos & Music",
      urls: [
        "https://www.pexels.com/video/side-view-silhouette-of-a-person-moving-5739693/",
        "https://www.pexels.com/video/fingers-pointing-at-a-sad-woman-7640667/",
        "https://www.pexels.com/video/crop-group-stacking-hands-together-6192775/",
        "https://www.pexels.com/video/writing-notes-on-stick-pads-6774467/",
        "https://www.pexels.com/video/a-man-crumbling-used-papers-with-errors-4873122/",
        "https://www.pexels.com/video/crumpled-paper-balls-falling-into-a-bin-11485778/",
        "https://www.pexels.com/video/a-teenage-boy-undergoing-counselling-4100356/",
        "https://www.pexels.com/video/man-people-office-relationship-4100354/",
        "https://pixabay.com/music/solo-guitar-the-beat-of-nature-122841/",
      ],
    },
    {
      type: "Fonts & Icons",
      urls: ["https://youssef-habchi.com/fonts/road-rage"],
    },
    {
      type: "",
      text: [
        "App by John Martin. Special thanks to Amy Miskimmin-Logan (OHOV participation development worker), Ciara Waugh (video narrator), and John Morrison (Liminal Studios).",
      ],
    },
  ];

  return (
    <div>
      {/*
      <div className="attributions" id="attributions">
        <button
          aria-label="View attributions"
          className="attribution-link"
          onClick={handleShow}
          target="_blank"
        >
          Attributions [+]
        </button>
      </div>
       */}
      <Modal
        aria-label="Modal showing attributions"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        dialogClassName="modal-90w"
        keyboard={false}
        onHide={handleClose}
        show={props.showAttributions}
      >
        <Modal.Header closeButton>
          <Modal.Title>Credits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ fontSize: 16 }}>
            Special thanks to Ciara W. (for her wonderful narration on the
            instructional video), to Amy Miskimmin-Logan (for her invaluable
            input, feedback, and support), to the Language Leaders and OHOV for
            embarking on this important project, and to John Morrison of Liminal
            Studios for consultation and liaisoning work. This app was developed
            by John Martin.
            <br />
            <br />
            Attributions & Media Sources
          </p>
          <textarea
            className="form-control"
            value={uiLabels.credits}
          ></textarea>
          <hr />
          <div
            className="py-2"
            style={{ fontSize: 12, textAlign: "center", width: "100%" }}
          >
            All assets used for non-commercial purposes.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            aria-label="Close attributions modal"
            className="btn-ohov-1"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAttributions;
