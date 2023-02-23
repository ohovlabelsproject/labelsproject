import { useState } from "react";
import stickyNoteHelper from "./stickynote-helpers";
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
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    if (labelsMetadata.labelBeingDisposedOf) return;
    let stickyNote = document.getElementById(elemId);
    setmouseDownState(false);
    stickyNote.style.zIndex = 1;
    handleDrop();
  };

  /* Handle what happens when note is moved by mouse:
   *************************************************/
  const handleMouseMove = (e) => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    if (labelsMetadata.labelBeingDisposedOf) return;
    if (mouseDownState) {
      let stickyNote = document.getElementById(elemId);
      let { clientX, clientY } = e;
      stickyNote.style.zIndex = "99";
      handleStickyNoteMove({ stickyNote, clientX, clientY });
    }
  };

  /* Handle what happens when note is moved by touch:
   *************************************************/
  const handleTouchMove = (e) => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    if (labelsMetadata.labelBeingDisposedOf) return;
    e.preventDefault();
    const touchLocation = e.targetTouches[0];
    let stickyNote = document.getElementById(elemId);
    let { pageX, pageY } = touchLocation;
    handleStickyNoteMove({ stickyNote, pageX, pageY });
    stickyNote.style.zIndex = "99";
    disablePageScroll();
  };

  /* Handle what happens when note touch ends:
   *************************************************/
  const handleTouchEnd = () => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    if (props.labelsMetadata.labelBeingDisposedOf) return;
    let binDropZone = document.getElementById("binzone-droparea");
    let stickyNote = document.getElementById(elemId);
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

  /* :
   *********************************************/
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

  /* Animate paperball crumpling:
   *********************************************/
  const animatePaperballCrumpling = () => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    stickyNoteHelper.animation.paperball.crumple({
      binDropZone: document.getElementById("binzone-droparea"),
      paperballImg: document.getElementById("paper-ball-sm-img"),
      paperballWrapper: document.getElementById("paper-ball-sm-wrapper"),
      stickyNote: document.getElementById(elemId),
    });
  };

  /* Handle what happens when note drops in bin:
   *********************************************/
  const handleSuccessfulBinDrop = (o) => {
    const { labelData, updateBinsArr, updateLabelDisposalState } = props;
    animatePaperballCrumpling();
    setTimeout(() => {
      animateDuck();
    }, 500);
    updateLabelDisposalState(true);
    updateBinsArr(labelData, o.labelElementId);
  };

  /* Handle what happens when note is dropped:
   *********************************************/
  const handleDrop = () => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    stickyNoteHelper.handleDrop({
      binDropZone: document.getElementById("binzone-droparea"),
      handleSuccessfulBinDrop,
      index: props.index,
      labelsMetadata: props.labelsMetadata,
      stickyNote: document.getElementById(elemId),
    });
  };

  /* :
   *********************************************/
  const determineRotationRandomness = (index) => {
    if (index % 3) return "random-rotate-0";
    if (index % 2) return "random-rotate-1";
    if (index % 5) return "random-rotate-2";
  };

  /* :
   *********************************************/
  const { hasStickyNoteAnimatedIn, index, labelsMetadata } = props;
  const labelAnim = "animate__animated animate__flipInX animate__delay-1s";
  const labelAnimStyle = hasStickyNoteAnimatedIn ? "" : labelAnim;
  const labelRotation = determineRotationRandomness(index);
  return (
    <div className="stickynote-sub-wrapper">
      <div
        className={`stickynote ${labelRotation} ${labelAnimStyle}`}
        id={`stickynote-${index + labelsMetadata.pageIndex * 9}`}
        onMouseDown={() => setmouseDownState(true)}
        onMouseUp={() => handleMouseUp()}
        onMouseMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
      >
        {props.label}
      </div>
    </div>
  );
}
export default StickyNote;
