import BinZone from "./binzone/binzone";
import StickyZone from "./stickyzone/stickyzone";

function Whiteboard(props) {
  return (
    <section className="whiteboard">
      <StickyZone
        placeholderWords={props.placeholderWords}
        labelsData={props.labelsData}
        wordMetadata={props.wordMetadata}
      />
      <BinZone />
    </section>
  );
}

export default Whiteboard;
