import ModalHeader from "./modalheader";
import ModalSubmitBtn from "./modalsubmitbtn";
import bannedWords from "../../bannedWords";
import settings from "../../settings";
import uiLabels from "../../uiLabels";
import { useState } from "react";

function ModalWindow(props) {
  const [submissionData, setSubmissionData] = useState({ label: "" });
  const [validationData, setValidationData] = useState({
    isInvalid: true,
    msg: "",
  });

  /* Check for bad words (not allowed):
   *****************************************/
  function isWithoutBannedWords(text) {
    let lowerText = text.toLowerCase();
    for (let i = 0; i < bannedWords.length; i++) {
      if (lowerText.indexOf(bannedWords[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  /* Make sure the label is a certain length:
   *****************************************/
  const isCorrectLength = (input) => {
    return (
      input.length < settings.labels.minLength ||
      input.length > settings.labels.maxLength
    );
  };

  /* Make sure the label doesn't already exist:
   *****************************************/
  const isLabelUnique = (input) => {
    let labelArr = [];
    if (props.labelsData && props.labelsData.labelsArr) {
      props.labelsData.labelsArr.forEach((labelDatum) => {
        if (labelDatum && labelDatum.label) {
          labelArr.push(labelDatum.label.trim().toLowerCase());
        }
      });
    }
    return labelArr.includes(input.trim().toLowerCase());
  };

  /* Validate user input:
   *****************************************/
  const validateInput = (input) => {
    if (isCorrectLength(input)) {
      return updataValidationDataState({
        isInvalid: true,
        msg: `Must be between ${settings.labels.minLength}-${settings.labels.maxLength} characters`,
      });
    }
    if (isWithoutBannedWords(input)) {
      return updataValidationDataState({
        isInvalid: true,
        msg: uiLabels.instructions.validation.hasBannedWord,
      });
    }
    if (isLabelUnique(input)) {
      return updataValidationDataState({
        isInvalid: true,
        msg: uiLabels.instructions.validation.hasDuplicate,
      });
    }
    return updataValidationDataState({
      isInvalid: false,
      msg: null,
    });
  };

  /* Reset state:
   *****************************************/
  const resetState = () => {
    setSubmissionData((previousState) => {
      return {
        ...previousState,
        isInvalid: true,
        msg: "",
      };
    });
    setValidationData(() => {
      return {
        label: "",
      };
    });
    // Anti-pattern, but just to make sure (wasn't working):
    document.getElementById("modal-label-submission").value = "";
  };

  /* Update validatation data state:
   *****************************************/
  const updataValidationDataState = (o) => {
    setValidationData((previousState) => {
      return {
        ...previousState,
        isInvalid: o.isInvalid,
        msg: o.msg,
      };
    });
  };
  return (
    <>
      <div
        aria-hidden="true"
        aria-label="Modal dialogue"
        aria-labelledby="staticBackdropLabel"
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="modal-add-label"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <ModalHeader title="Add label +" />
            <form>
              <div className="modal-body">
                {uiLabels.labelSubmission.body}
                <br />
                <br />
                <label>Your label:</label>
                <input
                  className="form-control modal-label-submission"
                  defaultValue={submissionData.label}
                  id="modal-label-submission"
                  maxLength={settings.labels.maxLength}
                  minLength={settings.labels.minLength}
                  onKeyUp={(e) => {
                    validateInput(e.target.value);
                    setSubmissionData((previousState) => {
                      return {
                        ...previousState,
                        label: e.target.value,
                      };
                    });
                  }}
                ></input>
                {validationData.msg && validationData.isInvalid ? (
                  <div className="alert alert-sm p-1 alert-info small">
                    <i className="fa fa-warning"></i>&nbsp;
                    {validationData.msg}
                  </div>
                ) : null}
                <small className="text-muted" style={{ fontSize: 11 }}>
                  {uiLabels.labelSubmission.footnote}
                </small>
              </div>
              <div className="modal-footer">
                <button
                  aria-label="Close or dismiss modal"
                  className="btn-ohov-2"
                  data-bs-dismiss="modal"
                  type="button"
                >
                  Close
                </button>
                <ModalSubmitBtn
                  handleCustomLabelSubmission={
                    props.handleCustomLabelSubmission
                  }
                  resetState={resetState}
                  validationData={validationData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalWindow;
