import "./App.scss";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Whiteboard from "./components/whiteboard/whiteboard";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="app">
      <div className="col-12 col-lg-10 offset-lg-1 main-area-wrapper">
        <Hud />
        <Instructions />
        <Whiteboard />
        <Footer />
      </div>
    </div>
  );
}

export default App;
