import Footer from "./components/footer/footer";
import Instructions from "./components/instructions/instructions";
import Loader from "./components/loader/loader";
import Whiteboard from "./components/whiteboard/whiteboard";

function Main(props) {
  return (
    <>
      {props.labelsData ? (
        <span className="animate__animated animate__fadeIn">
          <Instructions />
          <Whiteboard
            enableSound={props.enableSound}
            getDocs={props.getDocs}
            labelsData={props.labelsData}
            labelsMetadata={props.labelsMetadata}
            orientationData={props.orientationData}
            updateLabelDisposalState={props.updateLabelDisposalState}
            updateBinsArr={props.updateBinsArr}
          />
          <Footer />
        </span>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Main;
