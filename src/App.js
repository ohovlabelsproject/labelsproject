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
import helpers from "./helpers/helpers";
import ModalWindow from "./components/modal/modal";
import PaperBall from "./components/animation/paperball";

function App(props) {
  const enableDebug = false;
  // Initialise Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  // Firestore doc lookup:
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();

  /* Set/get meta:
   **********************************/
  const [labelsMetadata, setlabelsMetadata] = useState({
    pageIndex: 0,
    sliceStart: 0,
    sliceEnd: 9,
  });

  /* :
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());
      });
      // If array of labels length is not a multiple of 9, round up to multiple:
      let neededToPush;
      if (labelsArr.length % 9 !== 0) {
        neededToPush = helpers.labels.arr.roundUpLength(labelsArr);
      }
      for (let i = 0; i < neededToPush; i++) {
        labelsArr.push(null);
      }
      utils.arr.shuffle(labelsArr);
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr };
      });
    });
  };

  /* :
   **********************************/
  const handleCustomLabelSubmission = (label) => {}; // when user writes and submits custom label

  /* :
   **********************************/
  const handleLabelDestroyDb = (label) => {}; // writes to "labelsBinnedByUsers" collection

  /* :
   **********************************/
  const handleLabelDrag = (label) => {}; //

  /* :
   **********************************/
  const handleLabelDrop = (label) => {}; //

  /* :
   **********************************/
  const handleNavClick = (isRightArrow) => {
    if (isRightArrow) {
      setlabelsMetadata((previousState) => {
        return {
          ...previousState,
          sliceStart: labelsMetadata.sliceStart + 9,
          sliceEnd: labelsMetadata.sliceEnd + 9,
          pageIndex: labelsMetadata.pageIndex + 1,
        };
      });
    } else {
      setlabelsMetadata((previousState) => {
        return {
          ...previousState,
          sliceStart:
            labelsMetadata.sliceStart <= 0
              ? labelsMetadata.sliceStart
              : labelsMetadata.sliceStart - 9,
          sliceEnd:
            labelsMetadata.sliceEnd <= 9
              ? labelsMetadata.sliceEnd
              : labelsMetadata.sliceEnd - 9,
          pageIndex:
            labelsMetadata.sliceStart <= 0
              ? null
              : labelsMetadata.pageIndex - 1,
        };
      });
    }
  };

  useEffect(() => {
    getLabels();
  }, []);

  return (
    <div className="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <span style={{ display: enableDebug ? "block" : "none" }}>
          Start: {labelsMetadata.sliceStart} --- End: {labelsMetadata.sliceEnd}{" "}
          --- Pg: {labelsMetadata.pageIndex + 1}
        </span>
        <Hud />
        <Instructions />
        <ModalWindow />
        <Whiteboard
          labelsData={labelsData}
          getDocs={props.getDocs}
          labelsMetadata={labelsMetadata}
        />
        <Footer />
      </div>
      <NavBtnL
        handleNavClick={handleNavClick}
        labelsMetadata={labelsMetadata}
      />
      <NavBtnR
        handleNavClick={handleNavClick}
        labelsMetadata={labelsMetadata}
        maxLabels={
          40
        } /* Replace this with length of labels array when retrived from db */
      />
      <PaperBall />
    </div>
  );
}

export default App;
