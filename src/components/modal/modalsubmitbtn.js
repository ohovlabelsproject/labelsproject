function ModalSubmitBtn(props) {
  return (
    <button
      type="button"
      data-bs-dismiss="modal"
      className="btn-ohov-1"
      onClick={() => {
        const label = document.getElementById("modal-label-submission").value;
        props.handleCustomLabelSubmission(label);
      }}
    >
      Submit
    </button>
  );
}
export default ModalSubmitBtn;
