import StickyNote from "./stickynote.js/stickynote";

function StickyZone() {
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

  const latinWords = [
    "rabble-rouser",
    "troll",
    "cubile albus",
    "problem child",
    "amicitia clamare",
    "amor bestia",
    "annus aqua",
    "nuisance",
    "rascal",
    "delinquent",
    "ars crastinu arma",
    "stirrer",
    "troublemaker",
    "menace",
    "mischief maker",
    "bellum",
    "wild child",
    "caldus caelum",
    "larrikin",
    "antagoniser",
    "casa carcer",
    "cattus carmen",
    "bad news",
    "rebel",
    "cedere",
    "celer carcer",
    "cena cibus cinis",
    "circus cista coquere",
    "civis clavis",
    "provocateur",
    "cornu corpus crastinus",
    "crastinus",
    "anarchist",
    "cubile cubitum culina",
  ];

  const formattedArr = shuffleArr(latinWords).slice(0, 9);

  return (
    <section className="stickyzone">
      <div className="col-12 row stickynotes">
        {formattedArr.map((label, index) => (
          <div className="col-4 border stickynote-wrapper p-1">
            <StickyNote label={label} key={`label-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default StickyZone;
