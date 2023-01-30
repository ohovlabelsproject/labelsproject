function NeedsModerationTable() {
  const unvettedArr = [
    {
      label: "Problem person",
      ip: "127.2.2.1",
      timestamp: "01-02-20 10:30 GMT",
    },
    {
      label: "Badboy",
      ip: "66.6.00.05",
      timestamp: "05-10-23 12:40 GMT",
    },
    {
      label: "Smart",
      ip: "122.8.42.0",
      timestamp: "01-03-20 19:55 GMT",
    },
  ];
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
        {unvettedArr.map((unvetted) => {
          return (
            <tr>
              <td className="text-center px-2">
                <div className="modview-label-text mt-4">{unvetted.label}</div>
              </td>
              <td className="text-center px-2">
                <div className="mt-4" style={{ fontSize: "14px" }}>
                  Posted {unvetted.timestamp} by {unvetted.ip}
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
          );
        })}
      </tbody>
    </table>
  );
}

export default NeedsModerationTable;
