import "../App.scss";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import firebaseConfig from "../firebaseConfig";
import BarChartComponent from "./BarChartComponent";
import binsByTime from "./ResultsByTime/binsByTime";
import ResultsTable from "./ResultsSections/resultstable";

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
  const [labelsBy, setLabelsBy] = useState({
    period: "all time",
    mostBinned: { label: "biological", amount: 12 },
  });
  /* Get the labels from the database:
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      const dataByDate = [];
      snapshot.docs.forEach((doc) => {
        labelsArr.push(doc.data());
        dataByDate.push({
          name: doc.data().label.toLowerCase(),
          //uv: 100, // unique view
          pv: doc.data().bins.length, // page view
          amt: doc.data().bins.length, // amount
        });
      });
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr, dataByDate };
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
    let dataByDate = [];
    let labelsDesc;

    switch (e.target.value) {
      case "All time":
        const labelsBinnedAllTime = binsByTime.getAll(labelsData);
        labelsDesc = labelsBinnedAllTime.sort(
          (a, b) => b.bins.length - a.bins.length
        )[0];
        labelsBinnedAllTime.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "all time",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length,
            },
          };
        });
        setLabelsData((previousState) => {
          return { ...previousState, dataByDate };
        });
        return;
      case "Past year":
        const labelsBinnedPastYear = binsByTime.getYear(labelsData);
        labelsDesc = labelsBinnedPastYear.sort(
          (a, b) => b.bins.length - a.bins.length
        )[0];
        labelsBinnedPastYear.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "past year",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length,
            },
          };
        });
        setLabelsData((previousState) => {
          return { ...previousState, dataByDate };
        });
        return;
      case "Past month":
        const labelsBinnedPastMonth = binsByTime.getMonth(labelsData);
        labelsDesc = labelsBinnedPastMonth.sort(
          (a, b) => b.bins.length - a.bins.length
        )[0];
        labelsBinnedPastMonth.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "past month",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length,
            },
          };
        });
        setLabelsData((previousState) => {
          return { ...previousState, dataByDate };
        });
        return;
      case "Past week":
        const labelsBinnedPastWeek = binsByTime.getWeek(labelsData);
        labelsDesc = labelsBinnedPastWeek.sort(
          (a, b) => b.bins.length - a.bins.length
        )[0];
        labelsBinnedPastWeek.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "past week",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length,
            },
          };
        });
        setLabelsData((previousState) => {
          return { ...previousState, dataByDate };
        });
        return;

      case "Today":
        const labelsBinnedToday = binsByTime.getToday(labelsData);
        labelsDesc = labelsBinnedToday.sort(
          (a, b) => b.bins.length - a.bins.length
        )[0];
        labelsBinnedToday.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "today",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length,
            },
          };
        });
        setLabelsData((previousState) => {
          return { ...previousState, dataByDate };
        });
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
              <option>Today</option>
            </select>
            <p className="p-2" style={{ fontSize: 20, textAlign: "left" }}>
              The most binned label {labelsBy.period} —so far— is{" "}
              <b>"{labelsBy.mostBinned.label}"</b> (binned{" "}
              {labelsBy.mostBinned.amount} times).
            </p>
            <br />
            <div className="col-12" style={{ height: 300 }}>
              {labelsData && labelsData.labelsArr && labelsData.dataByDate ? (
                <BarChartComponent
                  data={labelsData.dataByDate}
                  labelsData={labelsData}
                />
              ) : null}
            </div>
            <br />
            {/*               labelsBy={labelsBy}
              labelsData={labelsData} */}
            <p className="p-2" style={{ fontSize: 20, textAlign: "left" }}>
              Here's a full results table:
            </p>
            <br />
            <ResultsTable labelsData={labelsData} setLabelsBy={setLabelsBy} />
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
