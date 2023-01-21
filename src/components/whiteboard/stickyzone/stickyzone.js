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
    "aestas ager",
    "agricola",
    "cubile albus",
    "alea",
    "amicitia clamare",
    "amor bestia",
    "annus aqua",
    "arbor",
    "arcus",
    "arma",
    "ars crastinu arma",
    "atrium",
    "auris",
    "aurum",
    "autumnus",
    "bellum",
    "bene",
    "caldus caelum",
    "campus",
    "caput",
    "casa carcer",
    "cattus carmen",
    "cauda",
    "cavia",
    "cedere",
    "celer carcer",
    "cena cibus cinis",
    "circus cista coquere",
    "civis clavis",
    "clima",
    "cornu corpus crastinus",
    "crastinus",
    "creare",
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
