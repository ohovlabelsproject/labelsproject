import BinZone from "./binzone/binzone";
import StickyZone from "./stickyzone/stickyzone";
import WhiteboardMsg from "./whiteboard-msg";

function Whiteboard(props) {
  return (
    <section className="whiteboard animate__animated animate__fadeIn">
      <WhiteboardMsg
        labelsMetadata={props.labelsMetadata}
        updateLabelDisposalState={props.updateLabelDisposalState}
      />
      <StickyZone
        labelsData={props.labelsData}
        labelsMetadata={props.labelsMetadata}
        orientationData={props.orientationData}
        placeholderWords={props.placeholderWords}
        updateLabelDisposalState={props.updateLabelDisposalState}
        updateBinsArr={props.updateBinsArr}
      />
      <BinZone />
    </section>
  );
}

export default Whiteboard;
