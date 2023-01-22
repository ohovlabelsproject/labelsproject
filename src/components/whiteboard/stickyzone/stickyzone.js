import NonStickyNote from "./stickynote.js/nonstickynote";
import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  //labelsData

  /*
  const x = shuffleArr(props.placeholderWords);
  const y = x.slice(props.wordMetadata.sliceStart, props.wordMetadata.sliceEnd);
  console.log(props.labelsData.labelsArr[0].label);*/
  return (
    <section className="stickyzone">
      <div className="col-12 row stickynotes">
        {props.labelsData
          ? props.labelsData.labelsArr.map((el, index) => (
              <div className="col-4 stickynote-wrapper p-1 border">
                {el === null ? (
                  <NonStickyNote label={"fill"} />
                ) : (
                  <StickyNote label={el.label} />
                )}
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default StickyZone;
