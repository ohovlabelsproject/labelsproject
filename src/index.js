import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
import "animate.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Results from "./Results/Results";
import Settings from "./Results/Settings";
import UnvettedLabels from "./Modview/UnvettedLabels";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppContainer() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/results" element={<Results />}></Route>
          {/*<Route path="/admin" element={<ModView />}></Route>*/}
          <Route path="/unvetted" element={<UnvettedLabels />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppContainer;

root.render(<AppContainer />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
