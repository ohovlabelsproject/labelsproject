function ModalSubmitBtn(props) {
  return (
    <button
      type="button"
      disabled={props.validationData.isInvalid}
      data-bs-dismiss="modal"
      className="btn-ohov-1"
      style={{ opacity: props.validationData.isInvalid ? 0.2 : 1 }}
      onClick={() => {
        const label = document.getElementById("modal-label-submission").value;
        if (!props.validationData.isInvalid) {
          props.handleCustomLabelSubmission(label);
        } else {
          alert("Cannot submit because: " + props.validationData.msg);
        }
      }}
    >
      Submit
    </button>
  );
}
export default ModalSubmitBtn;
