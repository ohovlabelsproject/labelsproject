import { Accordion } from "react-bootstrap";
import NeedsModerationTable from "./NeedsModerationTable";
import modreport from "./ModReport";

function ModView() {
  const blob = () => {
    let link = document.createElement("a");
    let blob = new Blob([modreport.generate()], { type: "text/html" });
    link.download = "stigmatising-labels-app-data.html";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };
  return (
    <>
      <div className="bg-dark text-light col-12 row p-0 m-0">
        <div className="col-4 pt-2">
          <button
            className="btn-ohov-1"
            onClick={() => {
              blob();
            }}
            style={{ fontSize: 14 }}
          >
            <i className="fa fa-download"></i>&nbsp;PDF
          </button>
        </div>
        <div className="col-4 pt-2">
          <h1 className="modview-section-title text-center">Modview</h1>
        </div>
        <div className="col-4 pt-2">
          <button className="btn-ohov-1" style={{ float: "right" }}>
            <i className="fa fa-sign-out"></i> Logout
          </button>
        </div>
      </div>
      <div
        className="container modview-wrapper mt-4"
        style={{ height: "100vh" }}
      >
        <br />
        <br />
        <div className="col-12 row p-0 m-0">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="p-0 m-0">
                <h3 className="modview-section-subtitle p-0 m-0">
                  Unvetted Submissions (2)
                </h3>
              </Accordion.Header>
              <Accordion.Body>
                <NeedsModerationTable />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h3 className="modview-section-subtitle p-0 m-0">
                  Vetted Submissions (9)
                </h3>
              </Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <h3 className="modview-section-subtitle p-0 m-0">Stats</h3>
              </Accordion.Header>
              <Accordion.Body>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Stat</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Labels total</td>
                      <td>9</td>
                    </tr>
                    <tr>
                      <td>Most binned</td>
                      <td>Articulate</td>
                    </tr>
                    <tr>
                      <td>Least binned</td>
                      <td>Victim</td>
                    </tr>
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="bg-wrapper-1" id="bg-wrapper-1"></div>
          <div className="bg-wrapper-2" id="bg-wrapper-2"></div>
        </div>
      </div>
    </>
  );
}

export default ModView;
