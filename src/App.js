import "./App.scss";
import DebugPanel from "./DebugPanel";
import Duck from "./components/animation/duck";
import Hud from "./components/hud/hud";
import Main from "./Main";
import Modals from "./components/modals/modals";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";
import PaperBall from "./components/animation/paperball";
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
import settings from "./settings";

function App(props) {
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);
  // eslint-disable-next-line
  const auth = getAuth(app);
  const showDebugPanel = false;

  // Firestore doc lookup:
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* Set/get labels data to/from state:
   **********************************/
  const [userGeoloc, setUserGeoloc] = useState({});

  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();

  /* Set/get attribution show state:
   **********************************/
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
      localStorage.getItem("ohov_skip_intro") || settings.modes.testMode
        ? true
        : false,
  });

  /* Get user's IP from geolocation data:
   ******************************************************/
  const getUserGeolocation = () => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => setUserGeoloc(data));
  };

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
      label: label.trim(),
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

  /* Listen for orientation changes:
   ******************************************************/
  window.addEventListener("orientationchange", () => {
    utils.device.orientation.update();
  });

  /*
  useEffect(() => {
    // getLabels();
  }, []); */

  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 main-area-wrapper offset-sm-1">
        <DebugPanel
          labelsData={labelsData}
          labelsMetadata={labelsMetadata}
          showDebugPanel={showDebugPanel}
        />
        {/* 
        <div>
          <Alert variant="danger p-0">
            <img
              alt=""
              src="/img/ui/please-reorientate.png"
              width="50px"
              className="p-1"
            />
            For the best experience, please hold your device in portrait mode.
          </Alert>
        </div>*/}
        <Modals
          getLabels={getLabels}
          getUserGeolocation={getUserGeolocation}
          handleCustomLabelSubmission={handleCustomLabelSubmission}
          labelsData={labelsData}
          labelsMetadata={labelsMetadata}
          setShowAttributions={setShowAttributions}
          showAttributions={showAttributions}
        />
        <Hud
          setShowAttributions={setShowAttributions}
          showAttributions={showAttributions}
        />
        <Main
          getDocs={getDocs}
          labelsData={labelsData}
          labelsMetadata={labelsMetadata}
          updateBinsArr={updateBinsArr}
          updateLabelDisposalState={updateLabelDisposalState}
        />
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
