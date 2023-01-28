import { useState } from "react";
import { Modal } from "react-bootstrap";

function ModalAttributions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const attributions = [
    {
      type: "Graphics",
      urls: [
        "https://www.pexels.com/photo/photo-of-orange-dump-truck-toy-1186477/",
        "https://www.pexels.com/photo/yellow-duck-toy-beside-green-duck-toy-132464/",
        "https://www.vecteezy.com/vector-art/2219838-set-of-hand-drawn-arrow-doodles-on-white-background",
        "https://www.stickpng.com/img/miscellaneous/crumpled-paper/crumpled-paper-ball",
      ],
    },
    {
      type: "Icons",
      urls: ["https://fontawesome.com/"],
    },
    {
      type: "Textures",
      src: "",
      urls: ["https://www.transparenttextures.com/"],
    },
  ];

  return (
    <div>
      <div className="attributions" id="attributions">
        <button
          className="attribution-link"
          onClick={handleShow}
          target="_blank"
        >
          Attributions [+]
        </button>
      </div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
        dialogClassName="modal-90w"
        keyboard={false}
        onHide={handleClose}
        show={show}
      >
        <Modal.Header closeButton>
          <Modal.Title>Attributions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {attributions.map((attr) => {
            return (
              <>
                <b className="p-0 m-0">{attr.type}</b>
                {attr.src ? <p className="p-0 m-0">{attr.src}</p> : null}
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
          <button className="btn-ohov-1" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAttributions;
