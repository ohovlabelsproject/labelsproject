function StickyNote(props) {
  return (
    <div
      className="stickynote"
      id={`stickynote-${props.index}`}
      onTouchMove={(e) => {
        const touchLocation = e.targetTouches[0];
        let stickyNote = document.getElementById(`stickynote-${props.index}`);
        let stickyNoteRect = stickyNote.getBoundingClientRect();
        let { pageX, pageY } = touchLocation;
        // Allow sticky note to be dragged by its center:
        stickyNote.style.position = "absolute";
        stickyNote.style.left = pageX - stickyNoteRect.width / 2 + "px";
        stickyNote.style.top = pageY - stickyNoteRect.height / 2 + "px";
        // Stop page from scrolling/moving around while dragging sticky note:
        document.body.classList.add("scroll-disable");
      }}
      onTouchEnd={() => {
        let binDropZone = document.getElementById("binzone-droparea");
        let binDropZoneRect = binDropZone.getBoundingClientRect();
        let stickyNote = document.getElementById(`stickynote-${props.index}`);
        let stickyNoteRect = stickyNote.getBoundingClientRect();
        // The number of pixels out from boundary we'll allow users to be:
        let boundaryTolerance = 20;
        // Is the note vertically within the bin drop zone boundaries?
        let isNoteWithinBinVertically =
          stickyNoteRect.top >= binDropZoneRect.top - boundaryTolerance &&
          stickyNoteRect.bottom <= binDropZoneRect.bottom + boundaryTolerance;
        // Is the note horizontally within the bin drop zone boundaries?
        let isNoteWithinBinHorizontally =
          stickyNoteRect.left >= binDropZoneRect.left - boundaryTolerance &&
          stickyNoteRect.right <= binDropZoneRect.right + boundaryTolerance;
        // Is the note completely within the bin drop zone boundaries?
        let isNoteWithinBin =
          isNoteWithinBinVertically && isNoteWithinBinHorizontally;

        if (isNoteWithinBin) {
          alert("in bin!");
        }

        // Allow scrolling now that sticky note is no longer being dragged:
        document.body.classList.remove("scroll-disable");
      }}
    >
      {props.label}
      <div className="stickynote-test-data-wrapper">
        Label: {props.index + 1}
      </div>
    </div>
  );
}
export default StickyNote;
