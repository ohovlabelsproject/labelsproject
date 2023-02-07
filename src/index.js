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
import ModView from "./Modview/Modview";
import Results from "./Results/Results";

const root = ReactDOM.createRoot(document.getElementById("root"));

function AppContainer() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/results" element={<Results />}></Route>
          <Route path="/admin" element={<ModView />}></Route>
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
