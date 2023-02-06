import utils from "../components/utils/utils";
import uiLabels from "../uiLabels";

function NoNeedModerationTable(props) {
  const formatTimestamp = (ts) => {
    if (ts) {
      const d = new Date(ts);
      const date = utils.date.format.ordinalNumber(d.getDate());
      const day = uiLabels.date.days[d.getDay()];
      const month = uiLabels.date.months[d.getMonth()];
      const year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    }
    return "Unknown date";
  };
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th className="text-center" style={{ width: "30%" }}>
            Label
          </th>
          <th className="text-center" style={{ width: "40%" }}>
            Posted
          </th>
          <th className="text-center" style={{ width: "30%" }}></th>
        </tr>
      </thead>
      <tbody>
        {props.labelsData?.labelsArr?.map((l) => {
          // inc state of unvetted
          return l.vetted ? (
            <tr>
              <td className="text-center px-2">
                <div className="modview-label-text mt-4">{l.label}</div>
              </td>
              <td className="text-center px-2">
                <div className="mt-4" style={{ fontSize: "14px" }}>
                  <div>Posted by {l.author}</div>
                  <br />
                  <div>{formatTimestamp(l.timestamp)}</div>
                </div>
              </td>
              <td className="text-center">
                <div className="col-12 row">
                  <div className="col-12">
                    <button className="btn-ohov-approve mb-1">
                      <i className="fa fa-check"></i>&nbsp;Approve
                    </button>
                  </div>

                  <div className="col-12">
                    <button className="btn-ohov-delete mb-1">
                      <i className="fa fa-trash"></i>&nbsp;Delete
                    </button>
                  </div>
                  <div className="col-12">
                    <button className="btn-ohov-ban">
                      <i className="fa fa-ban"></i>&nbsp;Ban IP
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ) : null;
        })}
      </tbody>
    </table>
  );
}

export default NoNeedModerationTable;
