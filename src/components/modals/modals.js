import ModalAttributions from "../modal/modalAttributions";
import ModalWelcome from "../modal/modalWelcome";
import ModalWindow from "../modal/modal";

function Modals(props) {
  return (
    <>
      <ModalWelcome
        getLabels={props.getLabels}
        getUserGeolocation={props.getUserGeolocation}
        labelsMetadata={props.labelsMetadata}
        preventDefaultTouchActions={props.preventDefaultTouchActions}
        updateOverflowStyleBehaviour={props.updateOverflowStyleBehaviour}
      />
      <ModalWindow
        labelsData={props.labelsData}
        handleCustomLabelSubmission={props.handleCustomLabelSubmission}
      />
      <ModalAttributions
        showAttributions={props.showAttributions}
        setShowAttributions={props.setShowAttributions}
      />
    </>
  );
}

export default Modals;
