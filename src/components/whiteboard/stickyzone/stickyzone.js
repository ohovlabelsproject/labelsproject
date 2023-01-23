import NonStickyNote from "./stickynote.js/nonstickynote";
import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  //labelsData

  /*
  const x = shuffleArr(props.placeholderWords);
  const y = x.slice(props.labelsMetadata.sliceStart, props.labelsMetadata.sliceEnd);
  console.log(props.labelsData.labelsArr[0].label);*/
  return (
    <section className="stickyzone">
      <div className="col-12 row stickynotes">
        {props.labelsData
          ? props.labelsData.labelsArr
              .slice(
                props.labelsMetadata.sliceStart,
                props.labelsMetadata.sliceEnd
              )
              .map((el, index) => (
                <div className="col-4 stickynote-wrapper p-1">
                  {el === null ? (
                    <NonStickyNote
                      index={index}
                      label={"fill"}
                      key={`label-${index}`}
                    />
                  ) : (
                    <StickyNote
                      index={index}
                      label={el.label}
                      key={`label-${index}`}
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
