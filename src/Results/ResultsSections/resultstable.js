function ResultsTable(props) {
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Label</th>
            <th>Times Binned</th>
          </tr>
        </thead>
        <tbody>
          {props.labelsData &&
          props.labelsData.labelsArr &&
          props.labelsData.dataByDate
            ? props.labelsData.dataByDate
                .sort((a, b) => b.pv - a.pv)
                .map((label, index) => {
                  return (
                    <tr key={`tr-${index}`}>
                      <td>"{label.name}"</td>
                      <td>{label.pv}</td>
                    </tr>
                  );
                })
            : null}
        </tbody>
      </table>
      {props.labelsBy?.binCount ? `Total: ${props.labelsBy?.binCount}` : null}
    </div>
  );
}

export default ResultsTable;
