import "./App.scss";
import Duck from "./components/animation/duck";
import Footer from "./components/footer/footer";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Loader from "./components/loader/loader";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";
import PaperBall from "./components/animation/paperball";
import ModalAttributions from "./components/modal/modalAttributions";
import ModalWindow from "./components/modal/modal";
import ModalWelcome from "./components/modal/modalWelcome";
import Whiteboard from "./components/whiteboard/whiteboard";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "./firebaseConfig";
import helpers from "./helpers/helpers";
import uiLabels from "./uiLabels";
import utils from "./components/utils/utils";

function App(props) {
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);
  // eslint-disable-next-line
  const auth = getAuth(app);
  const showDebugPanel = false;
  const testMode = false;

  // Firestore doc lookup:
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* Set/get labels data to/from state:
   **********************************/
  const [userGeoloc, setUserGeoloc] = useState({});

  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();

  const [showAttributions, setShowAttributions] = useState(false);

  /* Set/get meta:
   **********************************/
  const [labelsMetadata, setlabelsMetadata] = useState({
    pageIndex: 0,
    sliceStart: 0,
    sliceEnd: 9,
    labelBeingDisposedOf: false,
    // Skip the intro/welcome modal if there's a local storage item saying to do so?
    skipIntro:
      localStorage.getItem("ohov_skip_intro") || testMode ? true : false,
  });

  /* Get the labels from the database:
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());
      });
      utils.arr.shuffle(labelsArr); // <---- shuffle before rounding up array?
      // If array of labels length !== multiple of 9, round up to multiple:
      let neededToPush;
      if (labelsArr.length % 9 !== 0) {
        neededToPush = helpers.labels.arr.roundUpLength(labelsArr);
      }
      for (let i = 0; i < neededToPush; i++) {
        labelsArr.push(null);
      }
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr };
      });
    });
  };

  /* Handle label submission (add doc):
   **********************************/
  const handleCustomLabelSubmission = (label) => {
    // If the user already added this label, return:
    if (localStorage.getItem("ohov_l_sub_" + label)) {
      alert(uiLabels.labelSubmission.feedback.userAlreadyAdded);
      return;
    }
    addDoc(colRef, {
      bins: [
        {
          binnedOn: new Date(),
          binnedBy: userGeoloc.IPv4 ? userGeoloc.IPv4 : "0",
        },
      ],
      id: uuidv4(),
      label: label,
      submittedBy: userGeoloc.IPv4 ? userGeoloc.IPv4 : "0",
      submittedOn: new Date(),
      vetted: false,
    })
      .then(() => {
        alert(uiLabels.labelSubmission.feedback.successfulSubmission);
        localStorage.setItem("ohov_l_sub_" + label, true);
      })
      .catch((e) => {
        alert(`Please contact administrator: ${e}`);
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

  /* :
   **********************************/
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

  /* :
   ******************************************************/
  window.addEventListener("orientationchange", function () {
    //alert("Landscape mode doesn't currently work properly!");
  });

  /* Get user's IP from geolocation data:
   ******************************************************/
  const getUserGeolocation = () => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => setUserGeoloc(data));
  };

  /* Update bins array:
   ******************************************************/
  const updateBinsArr = (o) => {
    const id = o.id;
    const q = query(collection(db, "labels"), where("id", "==", id));
    getDocs(q).then((snapshot) => {
      snapshot.forEach((doc) => {
        const binsArr = doc.data().bins;
        binsArr.push({
          binnedBy: userGeoloc.IPv4 ? userGeoloc.IPv4 : "0",
          binnedOn: new Date(),
        });
        updateDoc(doc.ref, {
          bins: binsArr,
        });
      });
    });
  };

  /* Update overflow and behaviour styles:
   ******************************************************/
  const updateOverflowStyleBehaviour = () => {
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehaviorY = "contain !important";
    document.body.style.overscrollBehavior = "contain";
  };

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
          getUserGeolocation={getUserGeolocation}
          labelsMetadata={labelsMetadata}
          preventDefaultTouchActions={preventDefaultTouchActions}
          updateOverflowStyleBehaviour={updateOverflowStyleBehaviour}
        />
        <ModalWindow
          labelsData={labelsData}
          handleCustomLabelSubmission={handleCustomLabelSubmission}
        />
        <ModalAttributions
          showAttributions={showAttributions}
          setShowAttributions={setShowAttributions}
        />
        <Hud
          showAttributions={showAttributions}
          setShowAttributions={setShowAttributions}
        />
        {labelsData ? (
          <span className="animate__animated animate__fadeIn">
            <Instructions />
            <Whiteboard
              getDocs={props.getDocs}
              labelsData={labelsData}
              labelsMetadata={labelsMetadata}
              updateLabelDisposalState={updateLabelDisposalState}
              updateBinsArr={updateBinsArr}
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
