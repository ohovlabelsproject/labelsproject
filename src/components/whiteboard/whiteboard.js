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
        placeholderWords={props.placeholderWords}
        labelsData={props.labelsData}
        labelsMetadata={props.labelsMetadata}
        updateLabelDisposalState={props.updateLabelDisposalState}
      />
      <BinZone />
    </section>
  );
}

export default Whiteboard;
