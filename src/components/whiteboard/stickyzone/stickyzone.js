import { useEffect, useState } from "react";
import NoLabels from "./nolabels";
import NonStickyNote from "./stickynote.js/nonstickynote";
import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  const [hasStickyNoteAnimatedIn, setHasStickyNoteAnimatedIn] = useState(false);
  const { labelsData, labelsMetadata } = props;

  /* Don't repeat label intro animations:
   *******************************************/
  useEffect(() => {
    setTimeout(() => {
      setHasStickyNoteAnimatedIn(true);
    }, 4000);
  }, []);

  return (
    <section className="stickyzone" id="stickyzone">
      <div className="col-12 row stickynotes">
        <NoLabels labelsData={props.labelsData} />
        {/* Check we have labels data before mapping:
         *******************************************/}
        {labelsData
          ? labelsData.labelsArr
              .slice(labelsMetadata.sliceStart, labelsMetadata.sliceEnd)
              .map((el, index) => (
                <div className="col-4 p-1 stickynote-wrapper">
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
                      updateBinsArr={props.updateBinsArr}
                      updateLabelDisposalState={props.updateLabelDisposalState}
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
