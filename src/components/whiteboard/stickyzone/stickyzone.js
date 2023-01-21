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

  return (
    <section className="stickyzone">
      <div className="col-12 row stickynotes">
        {shuffleArr(props.placeholderWords)
          .slice(props.wordMetadata.sliceStart, props.wordMetadata.sliceEnd)
          .map((label, index) => (
            <div className="col-4 border stickynote-wrapper p-1">
              <StickyNote label={label} key={`label-${index}`} />
            </div>
          ))}
      </div>
    </section>
  );
}

export default StickyZone;
