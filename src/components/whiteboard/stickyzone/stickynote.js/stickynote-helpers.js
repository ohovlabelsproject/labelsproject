const stickyNoteHelper = {
  animation: {
    paperball: {
      crumple: (o) => {
        let frameIndex = 0;
        const frameSrc = "/img/paper-ball/paper-ball-sm";
        const frames = [
          { src: `${frameSrc}-1-compressed.png`, w: "100%" },
          { src: `${frameSrc}-2-compressed.png`, w: "100%" },
          { src: `${frameSrc}-3-compressed.png`, w: "100%" },
          { src: `${frameSrc}-4-compressed.png`, w: "100%" },
          { src: `${frameSrc}-compressed.png`, w: "100%" },
        ];
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
};

export default stickyNoteHelper;
