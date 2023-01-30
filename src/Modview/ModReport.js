const modreport = {
  generate: () => {
    return `<div style="font-family: sans-serif;">
        <h1>Report</h1>
        <p>Description here</p>
        <table border="1px" style="width: 400px; text-align: center;">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Posted</th>
                    <th>Binned #</th>
                </tr>
            </thead>
            <tbody>
            ${[
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
            ]
              .map((l) => {
                return `<tr>
                    <td>${l.label}</td>
                    <td>${l.timestamp}</td>
                    <td>${l.count}</td>
                </tr>`;
              })
              .join("")}
        </tbody>
        </table>
    </div>`;
  },
};

export default modreport;
