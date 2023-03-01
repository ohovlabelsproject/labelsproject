import utils from "../../../utils/utils";

/* Helper functions for stickynote:
 *********************************************/
const stickyNoteHelper = {
  animation: {
    duck: {
      move: (o) => {
        o.duck.style.top =
          document
            .getElementById("paper-ball-sm-wrapper")
            .style.top.split("px")[0] -
          20 +
          "px";
        o.duck.style.display = "block";
        o.duck.style.left = o.app.getBoundingClientRect().right + "px";
        const si2 = setInterval(() => {
          let inc = 2.5;
          const deviceIndex = utils.device.orientation.checkDevice();
          if (deviceIndex >= 3) inc = 5; // if bigger device, make duck faster
          const duckRect = o.duck.getBoundingClientRect();
          const appRect = o.app.getBoundingClientRect();
          if (duckRect.left < appRect.left - duckRect.width) {
            clearInterval(si2);
            setTimeout(() => {
              o.soundQuack.stop();
              o.soundTruck.stop();
              o.updateLabelDisposalState(false); // Wait half a second on animation finish
            }, 500);
          } else {
            o.duck.style.left =
              o.duck.getBoundingClientRect().left - inc + "px";
            // If duck touching paperball:
            if (
              duckRect.left <=
              o.paperballWrapper.getBoundingClientRect().right - 10
            ) {
              o.paperballWrapper.style.left =
                o.paperballWrapper.getBoundingClientRect().left - inc + "px";
            }
          }
        }, 1000 / 60);
      },
    },
    paperball: {
      crumple: (o) => {
        let frameIndex = 0;
        // Remove stickynote & make paperball appear:
        let stickyNoteTop = o.stickyNote.style.top;
        let stickyNoteRect = o.stickyNote.getBoundingClientRect();
        let pballL = stickyNoteRect.left + stickyNoteRect.width / 2 / 2 + "px";
        o.stickyNote.style.display = "none";
        o.paperballWrapper.style.display = "block";
        o.paperballWrapper.style.top = stickyNoteTop;
        o.paperballWrapper.style.left = pballL;
        o.paperballImg.src = frames[0].src;
        o.paperballImg.style.width = frames[0].w;
        o.binDropZone.classList.remove("binzone-active");
        // Cycle through frames:
        const si = setInterval(() => {
          o.paperballImg.src = frames[frameIndex].src;
          o.paperballImg.style.width = frames[frameIndex].w;
          if (frameIndex + 1 < frames.length) {
            frameIndex += 1;
          } else {
            clearInterval(si);
          }
        }, 50);
      },
    },
  },

  stickynote: {
    handleMove: (o) => {
      const { stickyNote, stickyNoteRect, tolerance, x, y } = o;
      stickyNote.style.position = "absolute";
      stickyNote.style.left = x - stickyNoteRect.width / 2 + "px";
      stickyNote.style.top = y - stickyNoteRect.height / 2 + "px";
      let binDropZone = document.getElementById("binzone-droparea");
      let binDropZoneRect = binDropZone.getBoundingClientRect();
      // The number of pixels out from boundary we'll allow users to be:
      let overTop = stickyNoteRect.top >= binDropZoneRect.top - o.tolerance;
      let overBtm = stickyNoteRect.bottom <= binDropZoneRect.bottom + tolerance;
      let overLft = stickyNoteRect.left >= binDropZoneRect.left - tolerance;
      let overRgt = stickyNoteRect.right <= binDropZoneRect.right + tolerance;
      // Is the note completely within the bin drop zone boundaries?
      let isNoteWithinBin = overTop && overBtm && overLft && overRgt;
      if (isNoteWithinBin) {
        //

        if (!o.isTruckSoundPlaying) {
          o.soundBinzone.play();
        }
        o.setIsTruckSoundPlaying(true);

        binDropZone.classList.add("binzone-active");
      } else {
        binDropZone.classList.remove("binzone-active");
      }
    },
    handleDrop: (o) => {
      // The number of pixels out from boundary we'll allow users to be:
      const tolerance = 20;
      let stickyNoteRect = o.stickyNote.getBoundingClientRect();
      let binDropZoneRect = o.binDropZone.getBoundingClientRect();
      let overTop = stickyNoteRect.top >= binDropZoneRect.top - tolerance;
      let overBtm = stickyNoteRect.bottom <= binDropZoneRect.bottom + tolerance;
      let overLft = stickyNoteRect.left >= binDropZoneRect.left - tolerance;
      let overRgt = stickyNoteRect.right <= binDropZoneRect.right + tolerance;
      // Is the note completely within the bin drop zone boundaries?
      let isNoteWithinBin = overTop && overBtm && overLft && overRgt;
      if (isNoteWithinBin) {
        o.handleSuccessfulBinDrop({
          labelElementId: o.index + o.labelsMetadata.pageIndex * 9,
        });
      }
    },
  },
};

/* Paperball animation frames:
 *********************************************/
const frameSrc = "/img/paper-ball/paper-ball-sm";
const frames = [
  { src: `${frameSrc}-1-compressed.png`, w: "100%" },
  { src: `${frameSrc}-2-compressed.png`, w: "100%" },
  { src: `${frameSrc}-3-compressed.png`, w: "100%" },
  { src: `${frameSrc}-4-compressed.png`, w: "100%" },
  { src: `${frameSrc}-compressed.png`, w: "100%" },
];

export default stickyNoteHelper;
