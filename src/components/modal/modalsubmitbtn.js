import settings from "../../settings";

function ModalSubmitBtn(props) {
  return (
    <button
      aria-label="Submit label"
      className="btn-ohov-1"
      data-bs-dismiss="modal"
      disabled={props.validationData.isInvalid}
      onClick={() => {
        const label = document.getElementById("modal-label-submission").value;
        if (!props.validationData.isInvalid) {
          props.handleCustomLabelSubmission(label);
        } else {
          alert("Cannot submit because: " + props.validationData.msg);
        }
        if (settings.shouldSkipIntro.onLabelSubmission) {
          localStorage.setItem("ohov_skip_intro", true);
        }
      }}
      style={{ opacity: props.validationData.isInvalid ? 0.2 : 1 }}
      type="button"
    >
      Submit
    </button>
  );
}
export default ModalSubmitBtn;
