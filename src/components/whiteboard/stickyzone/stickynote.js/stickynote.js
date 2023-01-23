import { useState } from "react";

function StickyNote(props) {
  const [mouseDownState, setmouseDownState] = useState(false);

  /* Disable page scroll (re: dragging notes):
   *************************************************/
  const disablePageScroll = () => {
    document.body.classList.add("scroll-disable");
  };

  /* Enable page scroll (note no longer dragging):
   *************************************************/
  const enablePageScroll = () => {
    document.body.classList.remove("scroll-disable");
  };

  /* Handle what happens on mouse up on note:
   ************************************************/
  const handleMouseUp = () => {
    setmouseDownState(false);
    handleDrop();
  };

  /* Handle what happens when note is moved by mouse:
   *************************************************/
  const handleMouseMove = (e) => {
    if (mouseDownState) {
      let stickyNote = document.getElementById(`stickynote-${props.index}`);
      let { clientX, clientY } = e;
      handleStickyNoteMove({ stickyNote, clientX, clientY });
    }
  };

  /* Handle what happens when note is moved by touch:
   *************************************************/
  const handleTouchMove = (e) => {
    const touchLocation = e.targetTouches[0];
    let stickyNote = document.getElementById(`stickynote-${props.index}`);
    let { pageX, pageY } = touchLocation;
    handleStickyNoteMove({ stickyNote, pageX, pageY });
    disablePageScroll();
  };

  /* Handle what happens when note touch ends:
   *************************************************/
  const handleTouchEnd = () => {
    handleDrop();
    enablePageScroll();
  };

  /* Handle what happens when note is moved:
   *********************************************/
  const handleStickyNoteMove = (o) => {
    let stickyNoteRect = o.stickyNote.getBoundingClientRect();
    let x = o.pageX ? o.pageX : o.clientX;
    let y = o.pageY ? o.pageY : o.clientY;
    o.stickyNote.style.position = "absolute";
    o.stickyNote.style.left = x - stickyNoteRect.width / 2 + "px";
    o.stickyNote.style.top = y - stickyNoteRect.height / 2 + "px";
  };

  /* Handle what happens when note drops in bin:
   *********************************************/
  const handleSuccessfulBinDrop = () => {
    //alert("Handling successful bin drop");
    let stickyNote = document.getElementById(`stickynote-${props.index}`);
    let stickyNoteRect = stickyNote.getBoundingClientRect();

    stickyNote.style.display = "none";

    // document.getElementById('paper-ball-sm-wrapper');
    // document.getElementById('paper-ball-sm-wrapper-img');

    document.getElementById("paper-ball-sm-wrapper").style.display = "block";
    document.getElementById("paper-ball-sm-wrapper").style.top =
      stickyNoteRect.top + "px";
    document.getElementById("paper-ball-sm-wrapper").style.left =
      stickyNoteRect.left + stickyNoteRect.width / 2 / 2 + "px";

    var frames = [
      //{ src: "/paper-ball-md.png", w: "150%" },
      /*
      { src: "/paper-ball-sm-flipped.png", w: "100%" },
      { src: "/paper-ball-sm-flipped-3.png", w: "100%" },
      { src: "/paper-ball-sm-flipped-2.png", w: "100%" },*/

      { src: "/paper-ball-sm-1.png", w: "100%" },
      { src: "/paper-ball-sm-2.png", w: "100%" },
      { src: "/paper-ball-sm-3.png", w: "100%" },
      { src: "/paper-ball-sm-4.png", w: "100%" },
      { src: "/paper-ball-sm.png", w: "100%" },
    ];
    var frameIndex = 0;

    document.getElementById("paper-ball-sm-img").src = frames[0].src;
    document.getElementById("paper-ball-sm-img").style.width = frames[0].w;

    setInterval(() => {
      console.log(frameIndex);
      document.getElementById("paper-ball-sm-img").src = frames[frameIndex].src;
      document.getElementById("paper-ball-sm-img").style.width =
        frames[frameIndex].w;
      if (frameIndex + 1 < frames.length) {
        frameIndex += 1;
      }
    }, 30);
  };

  /* Handle what happens when note is dropped:
   *********************************************/
  const handleDrop = () => {
    let binDropZone = document.getElementById("binzone-droparea");
    let binDropZoneRect = binDropZone.getBoundingClientRect();
    let stickyNote = document.getElementById(`stickynote-${props.index}`);
    let stickyNoteRect = stickyNote.getBoundingClientRect();
    // The number of pixels out from boundary we'll allow users to be:
    let tolerance = 20;
    let overTop = stickyNoteRect.top >= binDropZoneRect.top - tolerance;
    let overBtm = stickyNoteRect.bottom <= binDropZoneRect.bottom + tolerance;
    let overLft = stickyNoteRect.left >= binDropZoneRect.left - tolerance;
    let overRgt = stickyNoteRect.right <= binDropZoneRect.right + tolerance;
    // Is the note completely within the bin drop zone boundaries?
    let isNoteWithinBin = overTop && overBtm && overLft && overRgt;
    if (isNoteWithinBin) {
      handleSuccessfulBinDrop();
    }
  };
  return (
    <div
      className="stickynote"
      id={`stickynote-${props.index}`}
      onMouseDown={() => setmouseDownState(true)}
      onMouseUp={() => handleMouseUp()}
      onMouseMove={(e) => handleMouseMove(e)}
      onTouchMove={(e) => handleTouchMove(e)}
      onTouchEnd={() => handleTouchEnd()}
    >
      {props.label}
      {/*
      <div className="stickynote-test-data-wrapper">
        {`Label: ${props.index + 1} - Mousedown: ${mouseDownState}`}
      </div>
       */}
    </div>
  );
}
export default StickyNote;
