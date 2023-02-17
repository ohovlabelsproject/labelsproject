import "../App.scss";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import BarChartComponent from "./BarChartComponent";
import ResultsTable from "./ResultsSections/resultstable";
import binsByTime from "./ResultsByTime/binsByTime";
import firebaseConfig from "../firebaseConfig";
import uiLabels from "../uiLabels";

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
    mostBinned: { label: "", amount: 12 },
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
          // uv: 100, // unique view
          pv: doc.data().bins.length, // page view
          amt: doc.data().bins.length, // amount
        });
      });
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr, dataByDate };
      });
      setDefaultLabelsFilter();
    });
  };

  /* :
   **********************************/
  const setDefaultLabelsFilter = () => {
    setTimeout(() => {
      const selectElement = document.querySelector("#results-select");
      const event = new Event("change", { bubbles: true, cancelable: true });
      selectElement.value = "All time";
      selectElement.dispatchEvent(event);
    }, 500);
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
            period: "of all time",
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
            period: "over the past year",
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
            period: "over the past month",
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
            period: "over the past week",
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
        // Remove bins NOT from today!!!
        labelsBinnedToday.forEach((l) => {
          dataByDate.push({
            name: l.label.toLowerCase(),
            pv: l.bins.length, // page view // <-------- should be length of bins from today!
            amt: l.bins.length, // amount
          });
        });
        setLabelsBy((previousState) => {
          return {
            ...previousState,
            period: "today",
            mostBinned: {
              label: labelsDesc.label.toLowerCase(),
              amount: labelsDesc.bins.length, // <-------- should be length of bins from today!
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
        <header className="hud-results">
          {/*
          <h1
            className="p-2 results-title animate__animated animate__fadeIn animate__slow"
            style={{ textAlign: "center" }}
          >
            Results{" "}
            <img
              alt=""
              style={{ paddingBottom: 10 }}
              src="img/results/data-duck.png"
              width="40px"
            />
          </h1>
           */}
          <div className="row col-12 col-md-8">
            <div className="col-6 col-md-7 col-lg-8 text-center">
              <h1
                className="m-0 p-0 results-title animate__animated animate__fadeIn animate__slow"
                style={{ textAlign: "left" }}
              >
                Bin Data
              </h1>
            </div>
            <div className="col-6 col-md-5 col-lg-4 p-0 m-0">
              <div className="row col-12 p-0 m-0">
                <div className="col-6">
                  <button className="btn-ohov-1" style={{ width: 100 }}>
                    <i className="fa fa-print"></i> Print
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn-ohov-1" style={{ width: 100 }}>
                    <i className="fa fa-close"></i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section style={{ marginTop: 70 }}>
          <br />
          <br />
          <br />
          <div>
            <ol
              className="animate__animated animate__fadeIn animate__slow"
              style={{ textAlign: "left" }}
            >
              <li>
                <a href="#filter-by-period">Filter by Period</a>
              </li>
              <li>
                <a href="#download">Download</a>
              </li>
            </ol>
            <br />

            <h2
              className="p-2 results-heading animate__animated animate__fadeIn animate__slow"
              id="filter-by-period"
              style={{ textAlign: "left" }}
            >
              1. Filter by Period
            </h2>
            <div className="animate__animated animate__fadeIn animate__slow">
              <hr />
            </div>
            {labelsBy && labelsBy.period && labelsBy.mostBinned.label ? (
              <p className="p-2" style={{ fontSize: 20, textAlign: "left" }}>
                The most binned label {labelsBy.period} —so far— is{" "}
                <b>"{labelsBy.mostBinned.label}"</b> (binned{" "}
                {labelsBy.mostBinned.amount} times).
              </p>
            ) : null}
            <select
              aria-label="Results filtered by 'all time' by default"
              className="col-12 form-select animate__animated animate__fadeIn animate__slow"
              defaultValue="All time"
              id="results-select"
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
            <br />
            <br />
            <div
              className="col-12 animate__animated animate__fadeIn animate__slow"
              style={{ height: 300 }}
            >
              {labelsData &&
              labelsData.labelsArr &&
              labelsData.dataByDate &&
              labelsBy?.mostBinned.label ? (
                <BarChartComponent
                  data={labelsData.dataByDate}
                  labelsData={labelsData}
                />
              ) : null}
            </div>
            <br />
            <p
              className="p-2 animate__animated animate__fadeIn animate__slow"
              style={{ fontSize: 20, textAlign: "left" }}
            >
              Here's a full results table for{" "}
              {labelsBy && labelsBy.period ? labelsBy.period : null}:
            </p>
            <ResultsTable labelsData={labelsData} setLabelsBy={setLabelsBy} />
          </div>
        </section>
        <br />

        <h2
          className="p-2 results-heading animate__animated animate__fadeIn animate__slow"
          id="overview"
          style={{ textAlign: "left" }}
        >
          2. Download
        </h2>
        <hr />
        <p
          className="p-2 animate__animated animate__fadeIn animate__slow"
          style={{ fontSize: 20, textAlign: "left" }}
        >
          For your own reference:
          <br />
          <br />
          <button className="btn-ohov-1">
            Download <i className="fa fa-download"></i>
          </button>
          <button className="btn-ohov-1">
            Print page <i className="fa fa-print"></i>
          </button>
        </p>

        <footer className="footer">
          <small>
            &copy; {new Date().getFullYear()} {uiLabels.footer}
          </small>
        </footer>
        <div className="bg-wrapper-1" id="bg-wrapper-1"></div>
        <div className="bg-wrapper-2" id="bg-wrapper-2"></div>
      </div>
    </div>
  );
}

export default Results;
