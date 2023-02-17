import { Modal } from "react-bootstrap";

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
        "https://www.transparenttextures.com/",
      ],
    },
    {
      type: "Fonts & Icons",
      urls: [
        "https://fonts.google.com/",
        "https://fontawesome.com/",
        "https://uxwing.com/hand-holding-mobile-phone-icon/",
        "https://youssef-habchi.com/fonts/road-rage",
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
          <Modal.Title>Attributions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attributions.map((attr) => {
            return (
              <>
                <b className="m-0 p-0">{attr.type}</b>
                {attr.src ? <p className="m-0 p-0">{attr.src}</p> : null}
                <ul>
                  {attr.urls.map((url) => {
                    return (
                      <li style={{ fontSize: 11 }}>
                        <a href={url} rel="noreferrer" target="_blank">
                          {url}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            );
          })}
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
