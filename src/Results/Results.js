import "../App.scss";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import firebaseConfig from "../firebaseConfig";
import helpers from "../helpers/helpers";
import utils from "../components/utils/utils";
import uiLabels from "../uiLabels";

import { PureComponent } from "react";

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BarChartComponent from "./BarChartComponent";

function Results(props) {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
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
      const data1 = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());

        data1.push({
          name: doc.data().label.toLowerCase(),
          //uv: 100, // unique view
          pv: doc.data().count, // page view
          amt: doc.data().count, // amount
        });
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
      //

      setLabelsData((previousState) => {
        return { ...previousState, labelsArr, data1 };
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
    //alert("Landscape mode doesn't currently work properly!");
  });

  //
  const getUserGeolocation = () => {
    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => setUserGeoloc(data));
  };

  useEffect(() => {
    getLabels();
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const getIntroOfPage = (label) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };

  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <header className="hud"></header>
        <section className="">
          <div>
            <h1 style={{ textAlign: "left" }} className="p-1">
              Report
            </h1>
            <p>
              <ol style={{ textAlign: "left" }}>
                <li>
                  <a href="#results">Results</a>
                </li>
                <li>kd</li>
                <li>kd</li>
              </ol>
            </p>
            <h2 id="results" style={{ textAlign: "left" }} className="p-1">
              1. Results
            </h2>
            <hr />
            <p className="p-1" style={{ fontSize: 20, textAlign: "left" }}>
              We count every "binned" and submitted label and share it with our
              language team who are working on changing language in the hearings
              system. In doing so, we thought it's only fair that you too get to
              see the overall findings (as well as by day, week, month, and
              year).
            </p>
            Results from:{" "}
            <select className="form-control col-12">
              <option>All time</option>
              <option>Past year</option>
              <option>Past month</option>
              <option>Past week</option>
              <option>Past day</option>
            </select>
            <br />
            <div className="col-12" style={{ height: 300 }}>
              {labelsData && labelsData.labelsArr && labelsData.data1 ? (
                <BarChartComponent
                  data={labelsData.data1}
                  labelsData={labelsData}
                />
              ) : null}
            </div>
            <br />
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Label</th>
                    <th>Count</th>
                  </tr>
                </thead>
                {labelsData && labelsData.labelsArr && labelsData.data1
                  ? labelsData.data1.map((label) => {
                      return (
                        <tr>
                          <td>"{label.name}"</td>
                          <td>{label.pv}</td>
                        </tr>
                      );
                    })
                  : null}
              </table>
            </div>
          </div>
        </section>
        <br />
        <section className="">
          <div>
            <h2 style={{ textAlign: "left" }} className="p-1">
              Overall
            </h2>
            <hr />
            <p className="p-1" style={{ fontSize: 20, textAlign: "left" }}>
              Inclusive Design is a methodology, born out of digital
              environments, that enables and draws on the full range of human
              diversity. Most importantly, this means including and learning
              from people with a range of perspectives.
            </p>
            <div className="col-12" style={{ height: 200 }}>
              <BarChartComponent data={data} />
            </div>

            <br />
          </div>
        </section>

        {/*
        <footer className="footer">
          <small>
            &copy; {new Date().getFullYear()} {uiLabels.footer}
          </small>
        </footer> */}
        <div className="bg-wrapper-1" id="bg-wrapper-1"></div>
        <div className="bg-wrapper-2" id="bg-wrapper-2"></div>
      </div>
    </div>
  );
}

export default Results;
