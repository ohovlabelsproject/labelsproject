import { useState } from "react";
import utils from "../../../utils/utils";

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
    if (props.labelsMetadata.labelBeingDisposedOf) return;
    setmouseDownState(false);
    let stickyNote = document.getElementById(
      `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
    );
    stickyNote.style.zIndex = 1;
    handleDrop();
  };

  /* Handle what happens when note is moved by mouse:
   *************************************************/
  const handleMouseMove = (e) => {
    if (props.labelsMetadata.labelBeingDisposedOf) return;

    if (mouseDownState) {
      let stickyNote = document.getElementById(
        `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
      );
      stickyNote.style.zIndex = "99";
      let { clientX, clientY } = e;
      handleStickyNoteMove({ stickyNote, clientX, clientY });
    }
  };

  /* Handle what happens when note is moved by touch:
   *************************************************/
  const handleTouchMove = (e) => {
    if (props.labelsMetadata.labelBeingDisposedOf) return;
    e.preventDefault();
    const touchLocation = e.targetTouches[0];
    let stickyNote = document.getElementById(
      `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
    );
    let { pageX, pageY } = touchLocation;
    handleStickyNoteMove({ stickyNote, pageX, pageY });
    stickyNote.style.zIndex = "99";
    disablePageScroll();
  };

  /* Handle what happens when note touch ends:
   *************************************************/
  const handleTouchEnd = () => {
    if (props.labelsMetadata.labelBeingDisposedOf) return;
    let stickyNote = document.getElementById(
      `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
    );
    let binDropZone = document.getElementById("binzone-droparea");
    binDropZone.classList.remove("binzone-active");
    stickyNote.style.zIndex = "1";
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

    //
    let binDropZone = document.getElementById("binzone-droparea");
    let binDropZoneRect = binDropZone.getBoundingClientRect();
    //let stickyNote = document.getElementById(`stickynote-${props.index}`);

    // The number of pixels out from boundary we'll allow users to be:
    let tolerance = 20;
    let overTop = stickyNoteRect.top >= binDropZoneRect.top - tolerance;
    let overBtm = stickyNoteRect.bottom <= binDropZoneRect.bottom + tolerance;
    let overLft = stickyNoteRect.left >= binDropZoneRect.left - tolerance;
    let overRgt = stickyNoteRect.right <= binDropZoneRect.right + tolerance;
    // Is the note completely within the bin drop zone boundaries?
    let isNoteWithinBin = overTop && overBtm && overLft && overRgt;
    if (isNoteWithinBin) {
      binDropZone.classList.add("binzone-active");
    } else {
      binDropZone.classList.remove("binzone-active");
    }
  };

  /* Animate paperball crumpling:
   *********************************************/
  const animatePaperballCrumpling = () => {
    let stickyNote = document.getElementById(
      `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
    );
    let stickyNoteRect = stickyNote.getBoundingClientRect();
    let paperballWrapper = document.getElementById("paper-ball-sm-wrapper");
    let paperballImg = document.getElementById("paper-ball-sm-img");
    let binDropZone = document.getElementById("binzone-droparea");
    let frameIndex = 0;
    const frames = [
      { src: "/img/paper-ball/paper-ball-sm-1-compressed.png", w: "100%" },
      { src: "/img/paper-ball/paper-ball-sm-2-compressed.png", w: "100%" },
      { src: "/img/paper-ball/paper-ball-sm-3-compressed.png", w: "100%" },
      { src: "/img/paper-ball/paper-ball-sm-4-compressed.png", w: "100%" },
      { src: "/img/paper-ball/paper-ball-sm-compressed.png", w: "100%" },
    ];
    // Remove stickynote & make paperball appear:

    let stickyNoteTop = stickyNote.style.top;
    stickyNote.style.display = "none";
    paperballWrapper.style.display = "block";
    document.getElementById("paper-ball-sm-wrapper").style.top = stickyNoteTop;
    paperballWrapper.style.left =
      stickyNoteRect.left + stickyNoteRect.width / 2 / 2 + "px";
    paperballImg.src = frames[0].src;
    paperballImg.style.width = frames[0].w;
    binDropZone.classList.remove("binzone-active");
    // Cycle through frames:
    const si = setInterval(() => {
      paperballImg.src = frames[frameIndex].src;
      paperballImg.style.width = frames[frameIndex].w;
      if (frameIndex + 1 < frames.length) {
        frameIndex += 1;
      } else {
        clearInterval(si);
      }
    }, 50);
  };

  const animateDuck = () => {
    let duck = document.getElementById("duck");
    let app = document.getElementById("app");
    let paperballWrapper = document.getElementById("paper-ball-sm-wrapper");
    duck.style.top =
      document
        .getElementById("paper-ball-sm-wrapper")
        .style.top.split("px")[0] -
      20 +
      "px";
    duck.style.display = "block";
    duck.style.left = app.getBoundingClientRect().right + "px";
    //
    const si2 = setInterval(() => {
      const deviceIndex = utils.device.orientation.checkDevice();
      let inc = 2.5;
      if (deviceIndex >= 3) {
        // if bigger device, make duck faster
        inc = 5;
      }
      const duckRect = duck.getBoundingClientRect();
      const appRect = app.getBoundingClientRect();
      if (duckRect.left < appRect.left - duckRect.width) {
        clearInterval(si2);
        // Upon finishing animation, wait half a second:
        setTimeout(() => {
          props.updateLabelDisposalState(false);
        }, 500);
      } else {
        duck.style.left = duck.getBoundingClientRect().left - inc + "px";
        // If duck touching paperball
        if (
          duckRect.left <=
          paperballWrapper.getBoundingClientRect().right - 10
        ) {
          // paperballWrapper.classList.add("stickynote-rotating");
          paperballWrapper.style.left =
            paperballWrapper.getBoundingClientRect().left - inc + "px";
        }
      }
    }, 1000 / 60);
  };

  /* Handle what happens when note drops in bin:
   *********************************************/
  const handleSuccessfulBinDrop = (o) => {
    animatePaperballCrumpling();
    setTimeout(() => {
      animateDuck();
    }, 500);
    props.updateLabelDisposalState(true);
    props.updateBinsArr(props.labelData, o.labelElementId);
  };

  /* Handle what happens when note is dropped:
   *********************************************/
  const handleDrop = () => {
    let binDropZone = document.getElementById("binzone-droparea");
    let binDropZoneRect = binDropZone.getBoundingClientRect();
    let stickyNote = document.getElementById(
      `stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`
    );
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
      handleSuccessfulBinDrop({
        labelElementId: props.index + props.labelsMetadata.pageIndex * 9,
      });
    }
  };

  //
  const determineRotationRandomness = (index) => {
    if (props.index % 3) {
      return "random-rotate-0";
    }
    if (props.index % 2) {
      return "random-rotate-1";
    }
    if (props.index % 5) {
      return "random-rotate-2";
    }
  };

  return (
    <div
      className="stickynote-sub-wrapper"
      style={{ height: "100px", width: "100%" }}
    >
      <div
        className={`stickynote ${determineRotationRandomness(props.index)} ${
          props.hasStickyNoteAnimatedIn
            ? ""
            : "animate__animated animate__flipInX animate__delay-1s"
        }`}
        id={`stickynote-${props.index + props.labelsMetadata.pageIndex * 9}`} // <=== PLUS THE PAGE WE'RE ON
        onMouseDown={() => setmouseDownState(true)}
        onMouseUp={() => handleMouseUp()}
        onMouseMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
      >
        {props.label}
        {/*
        <div className="stickynote-test-data-wrapper">
          {props.index + 1 + props.labelsMetadata.pageIndex * 9}
        </div> */}
        {/*
      <div className="stickynote-test-data-wrapper">
        {`Label: ${props.index + 1} - Mousedown: ${mouseDownState}`}
      </div>
       */}
      </div>
    </div>
  );
}
export default StickyNote;
