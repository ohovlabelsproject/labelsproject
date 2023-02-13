import ModalAttributions from "../modal/modalAttributions";
import ModalSubmitExit from "../modal/modalSubmitExit";
import ModalWelcome from "../modal/modalWelcome";
import ModalWindow from "../modal/modal";

function Modals(props) {
  return (
    <>
      <ModalWelcome
        getLabels={props.getLabels}
        getOrientationData={props.getOrientationData}
        getUserGeolocation={props.getUserGeolocation}
        labelsMetadata={props.labelsMetadata}
      />
      <ModalWindow
        labelsData={props.labelsData}
        handleCustomLabelSubmission={props.handleCustomLabelSubmission}
        setShowSubmitExitModal={props.setShowSubmitExitModal}
      />
      <ModalAttributions
        setShowAttributions={props.setShowAttributions}
        showAttributions={props.showAttributions}
      />
      <ModalSubmitExit
        setShowSubmitExitModal={props.setShowSubmitExitModal}
        showSubmitExitModal={props.showSubmitExitModal}
      />
    </>
  );
}

export default Modals;
