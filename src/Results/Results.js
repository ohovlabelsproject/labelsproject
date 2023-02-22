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
import moment from "moment";
import resultsPrintPage from "./results-print-page";
import uiLabels from "../uiLabels";
import utils from "../components/utils/utils";
import ResultsDescription from "./ResultsDescription";

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
        const docData = doc.data();
        if (docData.vetted) {
          labelsArr.push(doc.data()); // Only push vetted labels
          dataByDate.push({
            name: doc.data().label.toLowerCase(),
            // uv: 100, // unique view
            pv: doc.data().bins.length, // page view
            amt: doc.data().bins.length, // amount
          });
        }
      });
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr, dataByDate };
      });
      setDefaultLabelsFilter();
    });
  };
  const formatTimesAmount = (amount) => {
    if (amount === 1) {
      return "time";
    } else {
      return "times";
    }
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
    utils.ui.animation.vantaBg.apply();
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

  const handleDownload = () => {
    const t = moment().format("L").split("/").join("_");
    const documentName = `ohov_labels_results_report_${t}.txt`;
    //
    function downloadBlob(blob, name = documentName) {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
      document.body.removeChild(link);
    }
    const textReport = resultsPrintPage.container.generate(labelsData);
    const txt = new Blob([textReport]);
    downloadBlob(txt, documentName);
  };

  /* :
   **********************************/
  const handleByYear = (dataByDate) => {
    // 1. Get labels binned this year.
    // 2. Get labels binned this year w/ other bins removed.
    // 3. Sort labels (descending order).
    const { year } = binsByTime;
    const lBinnedYear = year.getLabels(labelsData);
    const lWithOnlyYearBins = year.getLabelsWithOnlyYearsBins(lBinnedYear);
    const labelsSortedDesc = lWithOnlyYearBins.sort(
      (a, b) => b.bins.length - a.bins.length
    );
    let binCount = 0;
    // 4. Push sorted labels to array — will be set in state
    labelsSortedDesc.forEach((l) => {
      binCount += l.bins.length;
      dataByDate.push({
        name: l.label.toLowerCase(),
        pv: l.bins.length, // page view
        amt: l.bins.length, // amount
      });
    });
    setLabelsBy((previousState) => {
      return {
        ...previousState,
        period: "in the past year",
        binCount: binCount,
        mostBinned: {
          label: dataByDate[0].name,
          amount: dataByDate[0].pv,
        },
      };
    });
    setLabelsData((previousState) => {
      return { ...previousState, dataByDate };
    });
    return;
  };

  /* :
   **********************************/
  const handleByMonth = (dataByDate) => {
    // 1. Get labels binned this month.
    // 2. Get labels binned this month w/ other bins removed.
    // 3. Sort labels (descending order).
    const { month } = binsByTime;
    const lBinnedMonth = month.getLabels(labelsData);
    const lWithOnlyMonthsBins = month.getLabelsWithOnlyMonthsBins(lBinnedMonth);
    const labelsSortedDesc = lWithOnlyMonthsBins.sort(
      (a, b) => b.bins.length - a.bins.length
    );
    let binCount = 0;
    // 4. Push sorted labels to array — will be set in state
    labelsSortedDesc.forEach((l) => {
      binCount += l.bins.length;
      dataByDate.push({
        name: l.label.toLowerCase(),
        pv: l.bins.length, // page view
        amt: l.bins.length, // amount
      });
    });
    setLabelsBy((previousState) => {
      return {
        ...previousState,
        period: "in the past month",
        binCount: binCount,
        mostBinned: {
          label: dataByDate[0].name,
          amount: dataByDate[0].pv,
        },
      };
    });
    setLabelsData((previousState) => {
      return { ...previousState, dataByDate };
    });
    return;
  };

  /* :
   **********************************/
  const handleByWeek = (dataByDate) => {
    // 1. Get labels binned over past week.
    // 2. Get labels binned past week (w/ non-"past week" bins removed).
    // 3. Sort labels (descending order).
    const { week } = binsByTime;
    const lBinnedPastWeek = week.getLabels(labelsData);

    console.log(lBinnedPastWeek);
    //
    const lWithOnlyWeeksBins = week.getLabelsWithOnlyWeeksBins(lBinnedPastWeek);
    const labelsSortedDesc = lWithOnlyWeeksBins.sort(
      (a, b) => b.bins.length - a.bins.length
    );
    // 4. Push sorted labels to array — will be set in state
    labelsSortedDesc.forEach((l) => {
      dataByDate.push({
        name: "test", //l.label.toLowerCase(),
        pv: 10, //l.bins.length, // page view
        amt: 10, //l.bins.length, // amount
      });
    });
    let binCount;
    setLabelsBy((previousState) => {
      return {
        ...previousState,
        period: "over the past week",
        binCount: binCount,
        mostBinned: {
          label: "test", //labelsSortedDesc.label.toLowerCase(),
          amount: 10, //labelsSortedDesc.bins.length,
        },
      };
    });
    setLabelsData((previousState) => {
      return { ...previousState, dataByDate };
    });
  };

  /* :
   **********************************/
  const handleByToday = (dataByDate) => {
    // 1. Get labels binned today.
    // 2. Get labels binned today (w/ non-today bins removed).
    // 3. Sort labels (descending order).
    const { today } = binsByTime;
    const lBinnedToday = today.getLabels(labelsData);
    const lWithOnlyTodaysBins = today.getLabelsWithOnlyTodaysBins(lBinnedToday);
    const labelsSortedDesc = lWithOnlyTodaysBins.sort(
      (a, b) => b.bins.length - a.bins.length
    );
    let binCount = 0;
    // 4. Push sorted labels to array — will be set in state
    labelsSortedDesc.forEach((l) => {
      binCount += l.bins.length;
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
        binCount: binCount,
        mostBinned: {
          label: dataByDate[0]?.name,
          amount: dataByDate[0]?.pv,
        },
      };
    });
    setLabelsData((previousState) => {
      return { ...previousState, dataByDate };
    });
    return;
  };

  /* :
   **********************************/
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
        handleByYear(dataByDate);
        return;
      case "Past month":
        handleByMonth(dataByDate);
        return;
      case "Past week":
        handleByWeek(dataByDate);
        return;
      case "Today":
        handleByToday(dataByDate);
        return;
      default:
        console.log("-");
    }
  };
  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <header className="hud-results">
          <div className="row col-12 col-md-8">
            <div className="col-7 col-md-7 col-lg-8 text-center">
              <h1
                className="m-0 p-0 results-title animate__animated animate__fadeIn animate__slow"
                style={{ textAlign: "left" }}
              >
                <img
                  alt="Data duck"
                  className="animate__animated animate__fadeInDown animate__slow"
                  src="img/results/data-duck.png"
                  style={{ paddingBottom: 0 }}
                  width="30px"
                />{" "}
                Bin Data
              </h1>
            </div>
            <div className="col-5 col-md-5 col-lg-4 p-0 m-0">
              <div className="row col-12 p-0 m-0">
                <div className="col-12">
                  <button
                    className="btn-ohov-hud"
                    style={{ width: 110 }}
                    onClick={() => {
                      utils.ui.closeWindow();
                    }}
                  >
                    <i className="fa fa-close"></i> Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section style={{ marginTop: 30 }} id="results-section-1">
          <br />
          <br />
          <div>
            <ul
              className="animate__animated animate__fadeIn animate__slow"
              style={{ textAlign: "left" }}
            >
              <li>
                <a href="#" onClick={() => handleDownload()}>
                  <i className="fa fa-download"></i>&nbsp;Download .txt
                </a>
              </li>
              <li>
                <a href="#filter-by-period">
                  <i className="fa fa-download"></i>&nbsp;Download .csv
                </a>
              </li>
              <li>
                <a href="#filter-by-period">
                  <i className="fa fa-print"></i>&nbsp;Print webpage
                </a>
              </li>
            </ul>

            <div
              className="animate__animated animate__fadeIn animate__slow"
              style={{ borderBottom: "1px dashed #000" }}
            ></div>
            <br />
            <ResultsDescription
              formatTimesAmount={formatTimesAmount}
              labelsBy={labelsBy}
              labelsData={labelsData}
            />
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
              {/*<option>Past week</option>*/}
              <option>Today</option>
            </select>
            <br />
            <br />
            {labelsBy?.mostBinned.label ? (
              <ResultsOverview
                labelsBy={labelsBy}
                labelsData={labelsData}
                setLabelsBy={setLabelsBy}
              />
            ) : (
              <>
                <b>No labels have been binned during this period.</b>
              </>
            )}
          </div>
        </section>
        <br />
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

function ResultsOverview(props) {
  return (
    <>
      <div
        className="col-12 animate__animated animate__fadeIn animate__slow"
        style={{ height: 300 }}
      >
        {props.labelsData &&
        props.labelsData.labelsArr &&
        props.labelsData.dataByDate ? (
          <BarChartComponent
            data={props.labelsData.dataByDate}
            labelsData={props.labelsData}
          />
        ) : null}
      </div>
      <br />
      <p
        className="p-2 animate__animated animate__fadeIn animate__slow"
        style={{ fontSize: 20, textAlign: "left" }}
      >
        {props.labelsBy && props.labelsBy.period ? props.labelsBy.period : null}
        :
      </p>
      <ResultsTable
        labelsBy={props.labelsBy}
        labelsData={props.labelsData}
        setLabelsBy={props.setLabelsBy}
      />
    </>
  );
}

export default Results;
