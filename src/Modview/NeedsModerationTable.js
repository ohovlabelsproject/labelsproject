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
            Info
          </th>
          <th className="text-center" style={{ width: "30%" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {unvettedArr.map((unvetted) => {
          return (
            <tr>
              <td className="text-center px-2">{unvetted.label}</td>
              <td className="text-center px-2">
                <small>
                  Posted {unvetted.timestamp} by {unvetted.ip}
                </small>
              </td>
              <td className="text-center">
                <button className="form-control btn btn-success">
                  Approve label
                </button>
                <button className="form-control btn btn-danger">
                  Delete label
                </button>
                <button className="form-control btn btn-secondary">
                  Ban IP
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default NeedsModerationTable;
