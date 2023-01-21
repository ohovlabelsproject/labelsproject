import "./App.scss";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Whiteboard from "./components/whiteboard/whiteboard";
import Footer from "./components/footer/footer";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";
import { useState } from "react";

function App() {
  const placeholderWords = [
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

  const [wordMetadata, setWordMetadata] = useState({
    sliceStart: 0,
    sliceEnd: 9,
    pageIndex: 0,
  });

  const handleNavClick = (direction) => {
    if (direction) {
      // right-arrow
      setWordMetadata((previousState) => {
        return {
          ...previousState,
          sliceStart: wordMetadata.sliceStart + 9,
          sliceEnd: wordMetadata.sliceEnd + 9,
          pageIndex: wordMetadata.pageIndex + 1,
        };
      });
    } else {
      // left-arrow
      setWordMetadata((previousState) => {
        return {
          ...previousState,
          sliceStart:
            wordMetadata.sliceStart <= 0
              ? wordMetadata.sliceStart
              : wordMetadata.sliceStart - 9,
          sliceEnd:
            wordMetadata.sliceEnd <= 9
              ? wordMetadata.sliceEnd
              : wordMetadata.sliceEnd - 9,
          pageIndex:
            wordMetadata.sliceStart <= 0 ? null : wordMetadata.pageIndex - 1,
        };
      });
    }
  };

  const enableDebug = false;

  return (
    <div className="app">
      <div className="col-12 col-sm-10 col-lg-10 offset-lg-1 offset-sm-1 main-area-wrapper">
        <span style={{ display: enableDebug ? "block" : "none" }}>
          Start: {wordMetadata.sliceStart} --- End: {wordMetadata.sliceEnd} ---
          Pg: {wordMetadata.pageIndex + 1}
        </span>
        <Hud />
        <Instructions />
        <Whiteboard
          placeholderWords={placeholderWords}
          wordMetadata={wordMetadata}
        />
        <Footer />
      </div>
      <NavBtnL handleNavClick={handleNavClick} wordMetadata={wordMetadata} />
      <NavBtnR
        handleNavClick={handleNavClick}
        wordMetadata={wordMetadata}
        maxLabels={
          40
        } /* Replace this with length of labels array when retrived from db */
      />
    </div>
  );
}

export default App;
