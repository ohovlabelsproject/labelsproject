function ResultsTable(props) {
  const { labelsBy, labelsData } = props;
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
          {labelsData && labelsData.labelsArr && labelsData.dataByDate
            ? labelsData.dataByDate
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
      {labelsBy?.binCount ? `Total: ${labelsBy?.binCount}` : null}
    </div>
  );
}

export default ResultsTable;
