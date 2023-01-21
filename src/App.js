import "./App.scss";
import Hud from "./components/hud/hud";
import Instructions from "./components/instructions/instructions";
import Whiteboard from "./components/whiteboard/whiteboard";
import Footer from "./components/footer/footer";
import NavBtnL from "./components/navbtn/navbtnl";
import NavBtnR from "./components/navbtn/navbtnr";

function App() {
  return (
    <div className="app">
      <div className="col-12 col-sm-10 col-lg-10 offset-lg-1 offset-sm-1 main-area-wrapper">
        <Hud />
        <Instructions />
        <Whiteboard />
        <Footer />
      </div>
      <NavBtnL />
      <NavBtnR />
    </div>
  );
}

export default App;
