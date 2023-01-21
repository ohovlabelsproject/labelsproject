import BinZone from "./binzone/binzone";
import StickyZone from "./stickyzone/stickyzone";

function Whiteboard() {
  return (
    <section className="whiteboard">
      <StickyZone />
      <BinZone />
    </section>
  );
}

export default Whiteboard;
