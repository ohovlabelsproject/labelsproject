import "./App.scss";
import Duck from "./components/animation/duck";
import Footer from "./components/footer/footer";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Loader from "./components/loader/loader";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";
import PaperBall from "./components/animation/paperball";
import ModalWindow from "./components/modal/modal";
import ModalConfirmationMsg from "./components/modal/modalConfirmationMsg";
import ModalWelcome from "./components/modal/modalWelcome";
import Whiteboard from "./components/whiteboard/whiteboard";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useState } from "react";
import firebaseConfig from "./firebaseConfig";
import helpers from "./helpers/helpers";
import utils from "./components/utils/utils";

function App(props) {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const showDebugPanel = false;

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
    labelBeingDisposedOf: false,
  });

  /* Get the labels from the database:
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());
      });
      // If array of labels length !== multiple of 9, round up to multiple:
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

  /* Handle label submission (add doc):
   **********************************/
  const handleCustomLabelSubmission = (label) => {
    addDoc(colRef, {
      label: label,
      author: "anon",
      vetted: false,
    }).then(() => {
      alert(
        "At this point there could be a message telling the user their submission won't immediately appear - has to be moderated..."
      );
      // empty input field.... document....
    });
  };

  /* Handle nav arrows being clicked:
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

  //
  const isOrientationLandscape = () => {
    if (window.innerWidth > window.innerHeight) {
      return true;
    }
  };

  /* Prevent default touch actions:
   **********************************/
  const preventDefaultTouchActions = () => {
    document.getElementById("app").addEventListener("touchmove", (event) => {
      if (!isOrientationLandscape()) {
        event.preventDefault();
      }
    });
  };

  /* Update state of whether label disposal is under way:
   ******************************************************/
  const updateLabelDisposalState = (val) => {
    setlabelsMetadata((previousState) => {
      return {
        ...previousState,
        labelBeingDisposedOf: val,
      };
    });
  };

  window.addEventListener("orientationchange", function () {
    alert("Landscape mode doesn't currently work properly!");
  });

  /*
  useEffect(() => {
    // getLabels();
  }, []); */

  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <span style={{ display: showDebugPanel ? "block" : "none" }}>
          Start: {labelsMetadata.sliceStart} --- End: {labelsMetadata.sliceEnd}{" "}
          --- Pg: {labelsMetadata.pageIndex + 1} -- Labels #{" "}
          {labelsData?.labelsArr?.length}
        </span>
        <ModalWelcome
          getLabels={getLabels}
          preventDefaultTouchActions={preventDefaultTouchActions}
        />
        <ModalWindow
          labelsData={labelsData}
          handleCustomLabelSubmission={handleCustomLabelSubmission}
        />
        <ModalConfirmationMsg />
        <Hud />
        {labelsData ? (
          <span className="animate__animated animate__fadeIn">
            <Instructions />
            <Whiteboard
              labelsData={labelsData}
              getDocs={props.getDocs}
              labelsMetadata={labelsMetadata}
              updateLabelDisposalState={updateLabelDisposalState}
            />
            <Footer />
          </span>
        ) : (
          <Loader />
        )}
      </div>
      <NavBtnL
        handleNavClick={handleNavClick}
        labelsMetadata={labelsMetadata}
      />
      <NavBtnR
        handleNavClick={handleNavClick}
        labelsMetadata={labelsMetadata}
        labelsData={labelsData}
        maxLabels={9} /* Remove eventually */
      />
      <PaperBall />
      <Duck />
      <div className="bg-wrapper-1" id="bg-wrapper-1"></div>
      <div className="bg-wrapper-2" id="bg-wrapper-2"></div>
    </div>
  );
}

export default App;
