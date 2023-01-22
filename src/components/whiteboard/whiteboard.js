import BinZone from "./binzone/binzone";
import StickyZone from "./stickyzone/stickyzone";

function Whiteboard(props) {
  return (
    <section className="whiteboard">
      <StickyZone
        placeholderWords={props.placeholderWords}
        labelsData={props.labelsData}
        labelsMetadata={props.labelsMetadata}
      />
      <BinZone />
    </section>
  );
}

export default Whiteboard;
