import "./App.scss";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Whiteboard from "./components/whiteboard/whiteboard";
import Footer from "./components/footer/footer";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";
import firebaseConfig from "./firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import utils from "./components/utils/utils";

function App(props) {
  /* :
   **********************************/
  const enableDebug = false;

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Firestore doc lookup:
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* :
   **********************************/
  const [labelsData, setLabelsData] = useState();

  /* :
   **********************************/
  const [wordMetadata, setWordMetadata] = useState({
    sliceStart: 0,
    sliceEnd: 9,
    pageIndex: 0,
  });

  /* :
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());
      });
      utils.arr.shuffle(labelsArr);
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr };
      });
    });
  };

  /* :
   **********************************/
  const handleNavClick = (isRightArrow) => {
    if (isRightArrow) {
      setWordMetadata((previousState) => {
        return {
          ...previousState,
          sliceStart: wordMetadata.sliceStart + 9,
          sliceEnd: wordMetadata.sliceEnd + 9,
          pageIndex: wordMetadata.pageIndex + 1,
        };
      });
    } else {
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

  useEffect(() => {
    //getLabels();
  }, []);

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
          labelsData={labelsData}
          getDocs={props.getDocs}
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
