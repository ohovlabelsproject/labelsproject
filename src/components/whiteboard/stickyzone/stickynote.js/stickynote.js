import { useState } from "react";
import stickyNoteHelper from "./stickynote-helpers";
import { Howl } from "howler";

function StickyNote(props) {
  const [mouseDownState, setmouseDownState] = useState(false);
  const [isTruckSoundPlaying, setIsTruckSoundPlaying] = useState(false);

  const soundPaperCrumple = new Howl({
    src: ["/sounds/paper.mp3"],
    autoplay: false,
    loop: false,
    volume: props.enableSound ? 0.2 : 0,
  });

  const soundQuack = new Howl({
    src: ["/sounds/quack2.mp3"],
    autoplay: false,
    loop: false,
    volume: props.enableSound ? 0.2 : 0,
  });

  const soundTruck = new Howl({
    src: ["/sounds/truck.mp3"],
    autoplay: false,
    loop: false,
    volume: props.enableSound ? 0.2 : 0,
    /* onend: function () {
      console.log("Finished!");
    },*/
  });

  const soundClick = new Howl({
    src: ["/sounds/click.mp3"],
    autoplay: false,
    loop: false,
    volume: props.enableSound ? 0.5 : 0,
  });

  const soundBinzone = new Howl({
    src: ["/sounds/binzone.mp3"],
    autoplay: false,
    loop: false,
    volume: props.enableSound ? 0.2 : 0,
  });

  /*
  const soundImpact = new Howl({
    src: ["/sounds/impact.mp3"],
    autoplay: false,
    loop: false,
    volume: 0.5,
  });*/

  /* Animate the duck (truck and all):
   *********************************************/
  const animateDuck = () => {
    const { updateLabelDisposalState } = props;
    stickyNoteHelper.animation.duck.move({
      app: document.getElementById("app"),
      duck: document.getElementById("duck"),
      paperballWrapper: document.getElementById("paper-ball-sm-wrapper"),
      updateLabelDisposalState,
      soundQuack,
      soundTruck,
    });
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

  /* Determine the rotation of labels:
   *********************************************/
  const determineRotationRandomness = (index) => {
    if (index % 3) return "random-rotate-0";
    if (index % 2) return "random-rotate-1";
    if (index % 5) return "random-rotate-2";
  };

  /* Disable page scroll (re: dragging notes):
   *************************************************/
  const disablePageScroll = () => document.body.classList.add("scroll-disable");

  /* Enable page scroll (note no longer dragging):
   *************************************************/
  const enablePageScroll = () =>
    document.body.classList.remove("scroll-disable");

  /* Handle what happens when note is dropped:
   *********************************************/
  const handleDrop = () => {
    const { index, labelsMetadata } = props;
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    stickyNoteHelper.stickynote.handleDrop({
      binDropZone: document.getElementById("binzone-droparea"),
      handleSuccessfulBinDrop,
      index: props.index,
      labelsMetadata: props.labelsMetadata,
      stickyNote: document.getElementById(elemId),
    });
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

  /* Handle what happens when note is moved:
   *********************************************/
  const handleStickyNoteMove = (o) => {
    const elemId = `stickynote-${index + labelsMetadata.pageIndex * 9}`;
    let stickyNote = document.getElementById(elemId);
    let stickyNoteRect = o.stickyNote.getBoundingClientRect();
    let x = o.pageX ? o.pageX : o.clientX;
    let y = o.pageY ? o.pageY : o.clientY;
    stickyNoteHelper.stickynote.handleMove({
      isTruckSoundPlaying,
      setIsTruckSoundPlaying,
      soundBinzone,
      stickyNote,
      stickyNoteRect,
      tolerance: 20,
      x,
      y,
    });
  };

  /* Handle what happens when note drops in bin:
   *********************************************/
  const handleSuccessfulBinDrop = (o) => {
    const { labelData, updateBinsArr, updateLabelDisposalState } = props;
    animatePaperballCrumpling();
    soundPaperCrumple.play();
    setTimeout(() => {
      animateDuck();
      soundQuack.play();
      soundTruck.play();
    }, 500);
    updateLabelDisposalState(true);
    updateBinsArr(labelData, o.labelElementId);
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

  /* Stickynote div with events attached:
   *********************************************/
  const { hasStickyNoteAnimatedIn, index, label, labelsMetadata } = props;
  const labelAnim = "animate__animated animate__flipInX animate__delay-1s";
  const labelAnimStyle = hasStickyNoteAnimatedIn ? "" : labelAnim;
  const labelRotation = determineRotationRandomness(index);
  return (
    <div className="stickynote-sub-wrapper">
      <div
        className={`stickynote ${labelRotation} ${labelAnimStyle}`}
        id={`stickynote-${index + labelsMetadata.pageIndex * 9}`}
        onMouseDown={() => {
          setmouseDownState(true);
          soundClick.play();
        }}
        //onTouch={soundClick.play()}
        onMouseUp={() => handleMouseUp()}
        onMouseMove={(e) => handleMouseMove(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        onTouchEnd={() => handleTouchEnd()}
      >
        {label}
      </div>
    </div>
  );
}
export default StickyNote;
