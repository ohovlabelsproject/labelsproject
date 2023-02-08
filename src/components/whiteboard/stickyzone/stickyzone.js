import NoLabels from "./nolabels";
import NonStickyNote from "./stickynote.js/nonstickynote";
import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  return (
    <section className="stickyzone">
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
                      index={index}
                      key={`label-${index}`}
                      label={el.label}
                      labelData={props.labelsData.labelsArr[index]}
                      labelsMetadata={props.labelsMetadata}
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
