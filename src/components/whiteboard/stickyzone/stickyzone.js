import StickyNote from "./stickynote.js/stickynote";

function StickyZone(props) {
  const shuffleArr = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  //labelsData

  /*
  const x = shuffleArr(props.placeholderWords);
  const y = x.slice(props.wordMetadata.sliceStart, props.wordMetadata.sliceEnd);
  console.log(props.labelsData.labelsArr[0].label);*/
  return (
    <section className="stickyzone">
      <div className="col-12 row stickynotes">
        <div className="col-4 stickynote-wrapper p-1"></div>
        {props.labelsData
          ? props.labelsData.labelsArr.map((el, index) => (
              <div className="col-4 stickynote-wrapper p-1">
                <StickyNote label={el.label} />
              </div>
            ))
          : null}
      </div>
    </section>
  );
}

export default StickyZone;
