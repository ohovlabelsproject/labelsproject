import { Accordion } from "react-bootstrap";
import NeedsModerationTable from "./NeedsModerationTable";

function ModView() {
  return (
    <div className="container modview-wrapper" style={{ height: "100vh" }}>
      <br />
      <h1 className="modview-section-title">Modview</h1>
      <p className="py-2">
        Modview is a dashboard of sorts where you can get a quick overview of
        label submissions and take actions on them.
      </p>
      <button className="btn btn-secondary">Download report</button>
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
        </Accordion>

        {/*
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Label</th>
              <th style={{ width: "20%" }}>Time</th>
              <th style={{ width: "30%" }}>IP Address</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"Problem person"</td>
              <td>01-02-20 10:30 GMT</td>
              <td>112.22.22</td>
              <td>
                <button className="form-control btn btn-success">
                  Approve label
                </button>
                <button className="form-control btn btn-danger">
                  Delete label
                </button>
                <button className="form-control btn btn-secondary">
                  Ban IP address
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h2>Vetted Submissions</h2>
        <table>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Label</th>
              <th style={{ width: "20%" }}>Time</th>
              <th style={{ width: "30%" }}>IP Address</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"Problem person"</td>
              <td>01-02-20 10:30 GMT</td>
              <td>112.22.22</td>
              <td>
                <button className="form-control btn btn-success">
                  Unapprove label
                </button>
                <button className="form-control btn btn-danger">
                  Delete label
                </button>
                <button className="form-control btn btn-secondary">
                  Ban IP address
                </button>
              </td>
            </tr>
          </tbody>
        </table> */}

        {/*
        <div>Stats:</div>
        <div>Labels submitted: 9</div>
        <div>Different IP addresses: 9</div>
        <div>
          <br />
        </div> */}
        {/*
        <br />
        <b>Multi-action:</b>
        <select className="form-control">
          <option>Approval all</option>
          <option>Delete all</option>
          <option>Delete all</option>
          <option>Delete all</option>
        </select> */}
      </div>
    </div>
  );
}

export default ModView;
