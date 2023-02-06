function ModalHeader(props) {
  return (
    <div className="modal-header">
      <h5 className="modal-title" id="staticBackdropLabel">
        {props.title}
      </h5>
      <button
        aria-label="Close modal dialogue"
        className="btn-close"
        data-bs-dismiss="modal"
        type="button"
      ></button>
    </div>
  );
}

export default ModalHeader;
