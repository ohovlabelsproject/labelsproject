import firebaseConfig from "../firebaseConfig";
import moment from "moment";
import { getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeApp } from "@firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import utils from "../components/utils/utils";
import BackgroundElements from "../components/background";
import Loader from "../components/loader/loader";

function UnvettedLabels() {
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

  /* Get labels + push to state:
   **********************************/
  const getLabels = (e) => {
    getDocs(colRef).then((snapshot) => {
      const labelsArr = [];
      snapshot.docs.forEach((doc) => {
        let docDataCp = doc.data();
        docDataCp.documentId = doc.id;
        labelsArr.push(docDataCp);
      });
      setLabelsData((previousState) => {
        return { ...previousState, labelsArr };
      });
    });
  };

  /* Get submissions + generate table:
   **********************************/
  const getSubmissions = () => {
    return labelsData?.labelsArr?.filter((l) => !l.vetted).length ? (
      <table className="table table-striped" style={{ maxWidth: 800 }}>
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Label</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {labelsData?.labelsArr
            ?.filter((l) => !l.vetted)
            .map((l) => {
              return (
                <tr>
                  <td>{l.documentId}</td>
                  <td> {l.label}</td>
                  <td>{getSubmissionTime(l.submittedOn)}</td>
                </tr>
              );
            })}{" "}
        </tbody>
      </table>
    ) : (
      <p className="p-2 m-0">
        0 unvetted submissions in the queue. Check back later!
      </p>
    );
  };

  /* :
   **********************************/
  const getSubmissionTime = (submittedOn) => {
    const toDate = submittedOn.toDate();
    const toDateFormat = new Date(toDate);
    return moment(toDateFormat).fromNow();
  };

  useEffect(() => {
    document.body.overflow = "scroll";
    getLabels();
    utils.ui.animation.vantaBg.apply();
  }, []);

  return (
    <>
      <div
        className="container modview-wrapper my-5"
        style={{ height: "100vh" }}
      >
        <div className="col-12 row p-0 m-0">
          <h5 className="m-0 p-2">
            Unvetted Submissions (
            {labelsData?.labelsArr?.filter((l) => !l.vetted).length})
          </h5>
          <div style={{ borderTop: "1px dashed #000" }}></div>
          <br />
          {labelsData ? getSubmissions() : <Loader />}
          <BackgroundElements />
        </div>
      </div>
    </>
  );
}

export default UnvettedLabels;
