/* 
App.js notes:
--------------
This component holds most of the app's state. It
gets close to a "single source of truth". Perhaps
with extra time and budget I would use React's
"contexts" or Redux to have more organised state
management. This is a relatively small project, though
and I don't think it's essentially, but do bear this
in mind when seeing all the instances of "useState".
*/
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
import "./App.scss";
import firebaseConfig from "./firebaseConfig";
import helpers from "./helpers/helpers";
import uiLabels from "./uiLabels";
import utils from "./components/utils/utils";
import settings from "./settings";
import BackgroundElements from "./components/background";
import DebugPanel from "./DebugPanel";
import Duck from "./components/animation/duck";
import Hud from "./components/hud/hud";
import ImagePreload from "./components/imgpreload";
import Main from "./Main";
import Modals from "./components/modals/modals";
import NavBtns from "./components/navbtn/navbtns";
import PaperBall from "./components/animation/paperball";

function App() {
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);
  // eslint-disable-next-line
  const auth = getAuth(app);
  const db = getFirestore();
  const colRef = collection(db, "labels");
  const showDebugPanel = false;
  let resizeTimeout;

  /* Set/get labels data to/from state:
   **********************************/
  const [userGeoloc, setUserGeoloc] = useState({});
  /* Set/get orientation data:
   **********************************/
  const [orientationData, setOrientationData] = useState();
  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();
  /* Set/get attribution show state:
   **********************************/
  const [showAttributions, setShowAttributions] = useState(false);
  /* Set/get subm. exit modal's show:
   **********************************/
  const [showSubmitExitModal, setShowSubmitExitModal] = useState(false);
  /* Set/get label metadata:
   **********************************/
  const [labelsMetadata, setlabelsMetadata] = useState({
    pageIndex: 0,
    sliceStart: 0,
    sliceEnd: 9,
    labelBeingDisposedOf: false,
    labelAdditionBoardsNav: false,
    // Skip welcome modals if local storage item is true:
    skipIntro:
      localStorage.getItem("ohov_skip_welcome") || settings.modes.testMode
        ? true
        : false,
  });

  /* Get user's IPv4 from geolocation data:
   ******************************************************/
  const getUserGeolocation = () => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => setUserGeoloc(data));
  };

  /* Get the labels from the database:
   **********************************/
  const getLabels = () => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        const docData = doc.data();
        if (docData.vetted) labelsArr.push(doc.data()); // <- vetted labels only
      });
      utils.arr.shuffle(labelsArr); // <- shuffle labels
      // If array of labels length !== multiple of 9, round up to multiple:
      let neededToPush;
      if (labelsArr.length % 9 !== 0) {
        neededToPush = helpers.labels.arr.roundUpLength(labelsArr);
      }
      // Push newly formatted array of labels:
      for (let i = 0; i < neededToPush; i++) {
        labelsArr.push(null);
      }
      // Set state:
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr };
      });
    });
  };

  /* Handle label submission (add doc):
   **********************************/
  const handleCustomLabelSubmission = (label) => {
    const uniqueId = uuidv4();
    // If the user already added this label, return:
    if (localStorage.getItem("ohov_l_sub_" + label)) {
      alert(uiLabels.labelSubmission.feedback.userAlreadyAdded);
      return;
    }
    // Should we add bin on submission (submitter's bin):
    const binsArr = settings.labels.shouldAddBinOnSubmission
      ? [
          {
            binnedOn: new Date(),
            binnedBy: userGeoloc.IPv4 ? userGeoloc.IPv4 : "0",
          },
        ]
      : [];
    addDoc(colRef, {
      bins: binsArr,
      id: uniqueId,
      label: label.trim(),
      submittedBy: userGeoloc.IPv4 ? userGeoloc.IPv4 : "0",
      submittedOn: new Date(),
      vetted: false,
    })
      .then(() => {
        // Record of most recent submission:
        localStorage.setItem("ohov_recent_submission", label);
        // Record this submission to stop user submitting it twice:
        localStorage.setItem("ohov_l_sub_" + label, true);
        const st = setTimeout(() => {
          setShowSubmitExitModal(true);
          clearTimeout(st);
        }, 500);
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
          labelAdditionBoardsNav: true,
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
    utils.ui.animation.betweenBoards.apply("stickyzone");
    utils.ui.animation.betweenBoards.removeOnDelay("stickyzone", 600);
    utils.ui.animation.betweenBoards.snapback(labelsData);
  };

  /* Get orientation data:
   **********************************/
  const getOrientationData = () => {
    const getOverflowY =
      document.getElementById("app")?.getBoundingClientRect().height >
      window.innerHeight
        ? 1
        : 0;
    const getDeviceType = utils.device.orientation.checkDevice();
    const getOrientation = window.innerWidth > window.innerHeight ? 0 : 1;
    setOrientationData((previousState) => {
      return {
        ...previousState,
        overflowY: getOverflowY, // 0 = overflowing, 1 = fits
        w: window.innerWidth,
        h: window.innerHeight,
        // 0 & 1 = small screen, 2 = tablet, 3 = small computer, 4+ = big screens:
        deviceType: getDeviceType,
        orientation: getOrientation,
        /* If orientation is 0 (landscape) AND...
           if device is <=1 (mobile) AND...
           if content is overflow (scrolling is needed) 
           THEN... user should reorient device (if possible) */
        //getOrientation === 0 && getDeviceType <= 1 && getOverflowY === 0,
        shouldReorient: getOrientation === 0 && getOverflowY === 1,
      };
    });
  };

  /* Delay, so we're not constantly receiving event data:
   ******************************************************/
  const getOrientationDataOnDelay = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(getOrientationData, 600);
  };

  /* Update bins array:
   ******************************************************/
  const updateBinsArr = (o, labelElementId) => {
    const labelsArrCp = labelsData.labelsArr;
    labelsArrCp[labelElementId].hasUserBinnedIt = true;
    setLabelsData((previousState) => {
      return { ...previousState, labelsArr: labelsArrCp };
    });
    // Push bin to relevant label's bin array:
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
    getOrientationDataOnDelay();
  });

  /* Listen for resize + get new orientation data:
   ******************************************************/
  window.onresize = () => {
    getOrientationDataOnDelay();
  };

  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 main-area-wrapper offset-lg-2 offset-sm-1">
        <ImagePreload />
        {showDebugPanel ? (
          <DebugPanel
            labelsData={labelsData}
            labelsMetadata={labelsMetadata}
            orientationData={orientationData}
            setOrientationData={setOrientationData}
            showDebugPanel={showDebugPanel}
          />
        ) : null}
        <Modals
          getLabels={getLabels}
          getOrientationData={getOrientationData}
          getUserGeolocation={getUserGeolocation}
          handleCustomLabelSubmission={handleCustomLabelSubmission}
          labelsData={labelsData}
          labelsMetadata={labelsMetadata}
          setShowAttributions={setShowAttributions}
          setShowSubmitExitModal={setShowSubmitExitModal}
          showAttributions={showAttributions}
          showSubmitExitModal={showSubmitExitModal}
        />
        <Hud
          setShowAttributions={setShowAttributions}
          showAttributions={showAttributions}
        />
        <Main
          getDocs={getDocs}
          labelsData={labelsData}
          labelsMetadata={labelsMetadata}
          orientationData={orientationData}
          updateBinsArr={updateBinsArr}
          updateLabelDisposalState={updateLabelDisposalState}
        />
      </div>
      <NavBtns
        handleNavClick={handleNavClick}
        labelsData={labelsData}
        labelsMetadata={labelsMetadata}
      />
      <PaperBall />
      <Duck />
      <BackgroundElements />
    </div>
  );
}

export default App;
