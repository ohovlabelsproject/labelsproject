import { useEffect, useState } from "react";
import NoLabels from "./nolabels";
import NonStickyNote from "./stickynote.js/nonstickynote";
import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  const [hasStickyNoteAnimatedIn, setHasStickyNoteAnimatedIn] = useState(false);
  useEffect(() => {
    // Don't repeat stickynote animated entrances:
    setTimeout(() => {
      setHasStickyNoteAnimatedIn(true);
    }, 4000);
  }, []);

  return (
    <section className="stickyzone" id="stickyzone">
      <div className="col-12 row stickynotes">
        <NoLabels labelsData={props.labelsData} />
        {props.labelsData
          ? props.labelsData.labelsArr
              .slice(
                props.labelsMetadata.sliceStart,
                props.labelsMetadata.sliceEnd
              )
              .map((el, index) => (
                <div className="col-4 stickynote-wrapper p-1">
                  {el === null ? (
                    <NonStickyNote index={index} key={`label-${index}`} />
                  ) : (
                    <StickyNote
                      hasStickyNoteAnimatedIn={hasStickyNoteAnimatedIn}
                      index={index}
                      key={`label-${index}`}
                      label={el.label?.toLowerCase().trim()}
                      labelData={props.labelsData.labelsArr[index]}
                      labelsMetadata={props.labelsMetadata}
                      orientationData={props.orientationData}
                      updateLabelDisposalState={props.updateLabelDisposalState}
                      updateBinsArr={props.updateBinsArr}
                    />
                  )}
                </div>
              ))
          : null}
      </div>
    </section>
  );
}

export default StickyZone;
