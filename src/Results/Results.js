import "../App.scss";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";
import BackgroundElements from "../components/background";
import BarChartComponent from "./BarChartComponent";
import ResultsDescription from "./ResultsDescription";
import ResultsTable from "./ResultsSections/resultstable";
import binsByTime from "./ResultsByTime/binsByTime";
import firebaseConfig from "../firebaseConfig";
import moment from "moment";
import resultsGenerateFile from "./results-generate-files";
import uiLabels from "../uiLabels";
import utils from "../components/utils/utils";

function Results() {
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);
  // eslint-disable-next-line
  const auth = getAuth(app);
  const db = getFirestore();
  const colRef = collection(db, "labels");

  /* Set/get labels data to/from state:
   **********************************/
  const [labelsData, setLabelsData] = useState();
  const [labelsBy, setLabelsBy] = useState({
    period: "all time",
    mostBinned: { label: "", amount: 12 },
  });

  /* :
   **********************************/
  const formatTimesAmount = (amount) => {
    if (amount === 1) {
      return "time";
    } else {
      return "times";
    }
  };

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

  /* :
   **********************************/
  const generateCSV = () => {
    return resultsGenerateFile.csv({ labelsData });
  };

  /* :
   **********************************/
  const generateTextReport = () => {
    return resultsGenerateFile.txt({ labelsData, labelsBy });
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
        period: "the past year",
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
        period: "the past month",
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
    const lWithOnlyWeeksBins = week.getLabelsWithOnlyWeeksBins(lBinnedPastWeek);
    const labelsSortedDesc = lWithOnlyWeeksBins.sort(
      (a, b) => b.bins.length - a.bins.length
    );
    // 4. Push sorted labels to array — will be set in state
    labelsSortedDesc.forEach((l) => {
      dataByDate.push({
        name: l.label.toLowerCase(), //l.label.toLowerCase(),
        pv: l.bins.length, // page view
        amt: l.bins.length, // amount
      });
    });
    let binCount;
    setLabelsBy((previousState) => {
      return {
        ...previousState,
        period: "the past week",
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
  const handleDownload = (o) => {
    const t = moment().format("DD/MM/YYYY").split("/").join("_");
    const documentName = `${o.filename}${t}.${o.extension}`;
    const downloadBlob = (blob, name = documentName) => {
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
    };
    const content = o.contentGenerateFunc();
    const txt = new Blob([content]);
    downloadBlob(txt, documentName);
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

  /* :
   **********************************/
  const setDefaultLabelsFilter = () => {
    setTimeout(() => {
      const selectElement = document.querySelector("#results-select");
      const event = new Event("change", { bubbles: true, cancelable: true });
      selectElement.value = "All time";
      selectElement.dispatchEvent(event);
    }, 200);
  };

  useEffect(() => {
    getLabels();
    utils.ui.animation.vantaBg.apply();
    // eslint-disable-next-line
  }, []);
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
                <button
                  className="btn btn-link btn-link-regular-sm p-0"
                  onClick={() => window.print()}
                >
                  <i className="fa fa-print"></i>&nbsp;Print webpage
                </button>
              </li>
              <li>
                <button
                  className="btn btn-link btn-link-regular-sm p-0"
                  onClick={() =>
                    handleDownload({
                      filename:
                        "ohov_labels_" +
                        labelsBy.period.split(" ").join("_") +
                        "_results_",
                      extension: "txt",
                      contentGenerateFunc: generateTextReport,
                    })
                  }
                >
                  <i className="fa fa-download"></i>&nbsp;Download .txt report
                </button>
              </li>
              <li>
                <button
                  className="btn btn-link btn-link-regular-sm p-0"
                  onClick={() =>
                    handleDownload({
                      filename:
                        "ohov_labels_" +
                        labelsBy.period.split(" ").join("_") +
                        "_results_",
                      extension: "csv",
                      contentGenerateFunc: generateCSV,
                    })
                  }
                >
                  <i className="fa fa-download"></i>&nbsp;Download .csv
                  spreadsheet
                </button>
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
              <option>Past week</option>
              <option>Today</option>
            </select>
            <br />
            <br />
            <div className="animate__animated animate__fadeIn animate__slow animate__delay-1s">
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
            <br />
            <p
              className="p-2 animate__animated animate__fadeIn animate__slow"
              style={{ fontSize: 18, textAlign: "left" }}
            >
              Please note that these results are subject to change on a regular
              basis and driven by a sample that is not necessarily statistically
              significant. For more information and insights, do not hesistant
              to{" "}
              <a
                href="https://www.ohov.co.uk/contact-us/"
                rel="noreferrer"
                target="_blank"
              >
                contact us
              </a>
              .
            </p>
          </div>
        </section>
        <br />
        <footer className="footer">
          <small>
            &copy; {new Date().getFullYear()} {uiLabels.footer}
          </small>
        </footer>
        <BackgroundElements />
      </div>
    </div>
  );
}

function ResultsOverview(props) {
  const { labelsData } = props;
  return (
    <>
      <div
        className="col-12 animate__animated animate__fadeIn animate__slow"
        style={{ height: 300 }}
      >
        {labelsData && labelsData.labelsArr && labelsData.dataByDate ? (
          <BarChartComponent
            data={labelsData.dataByDate}
            labelsData={labelsData}
          />
        ) : null}
      </div>
      <br />
      <p
        className="p-2 animate__animated animate__fadeIn animate__slow"
        style={{ fontSize: 18, textAlign: "left" }}
      >
        Here are the results represented in a table (descending order):
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
