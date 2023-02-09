import "../App.scss";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import firebaseConfig from "../firebaseConfig";
import BarChartComponent from "./BarChartComponent";

function Results() {
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);
  // eslint-disable-next-line
  const auth = getAuth(app);

  // Firestore doc lookup:
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();

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
          pv: doc.data().bins.length, // page view
          amt: doc.data().bins.length, // amount
        });
      });
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr, data1 };
      });
    });
  };

  useEffect(() => {
    getLabels();
    // eslint-disable-next-line
  }, []);

  /*
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
  };*/

  const handleResultsFilterChange = (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
      case "All time":
        console.log("alll time");

        labelsData.labelsArr.map(() => {
          //
        });

        // set Data1

        return;
      case "Past year":
        console.log("passst year");
        return;
      case "Past month":
        console.log("passst month");
        return;
      case "Past week":
        console.log("passst week");
        return;
      case "Past day":
        console.log("passst week");
        return;
      default:
        console.log("-");
    }
  };

  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <header className="hud"></header>
        <section className="">
          <div>
            <h1 className="p-2" style={{ textAlign: "center" }}>
              Results
            </h1>
            <ol style={{ textAlign: "left" }}>
              <li>
                <a href="#overview">Overview</a>
              </li>
              <li>
                <a href="#resources">Resources</a>
              </li>
              <li>
                <a href="#attributions">Attributions</a>
              </li>
            </ol>
            <h2 className="p-2" id="overview" style={{ textAlign: "left" }}>
              1. Overview
            </h2>
            <hr />
            <p className="p-2" style={{ fontSize: 20, textAlign: "left" }}>
              We count every "binned" and submitted label and share it with our
              language team who are working on changing language in the hearings
              system. In doing so, we thought it's only fair that you too get to
              see the overall findings (as well as by day, week, month, and
              year).
            </p>
            Results from:{" "}
            <select
              aria-label="Results filtered by 'all time' by default"
              className="col-12 form-select"
              defaultValue="All time"
              onChange={(e) => {
                handleResultsFilterChange(e);
              }}
            >
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
                <tbody>
                  {labelsData && labelsData.labelsArr && labelsData.data1
                    ? labelsData.data1.map((label, index) => {
                        return (
                          <tr key={`tr-${index}`}>
                            <td>"{label.name}"</td>
                            <td>{label.pv}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <br />
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
