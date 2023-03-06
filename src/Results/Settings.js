import "../App.scss";
import uiLabels from "../uiLabels";

function Settings() {
  return (
    <div className="app" id="app">
      <div className="col-12 col-sm-10 col-lg-8 offset-lg-2 offset-sm-1 main-area-wrapper">
        <header className="hud-results">
          <div className="row col-12 col-md-8">
            <div className="col-6 col-md-7 col-lg-8 text-center">
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
                Settings
              </h1>
            </div>
            <div className="col-6 col-md-5 col-lg-4 p-0 m-0">
              <div className="row col-12 p-0 m-0">
                <div className="col-6">
                  <button className="btn-ohov-1" style={{ width: 110 }}>
                    <i className="fa fa-save"></i> Save
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn-ohov-1"
                    style={{ width: 110 }}
                    onClick={() => {
                      const myWindow = window.open("", "_self");
                      myWindow.document.write("");
                      setTimeout(function () {
                        myWindow.close();
                      }, 100);
                    }}
                  >
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
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Always skip welcome</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                </tr>
                <tr>
                  <td>Skip bin/duck animation</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                </tr>
                <tr>
                  <td>Hide previously binned labels</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                </tr>
                <tr>
                  <td>Shuffle labels</td>
                  <td>
                    <input type="checkbox"></input>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
        </section>
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

export default Settings;
