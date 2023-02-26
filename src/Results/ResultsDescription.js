import moment from "moment";

function ResultsDescription(props) {
  const { labelsBy } = props;
  const labelHasBins = labelsBy && labelsBy.period && labelsBy.mostBinned.label;

  return labelHasBins ? (
    <>
      <p className="p-2 py-0" style={{ fontSize: 18, textAlign: "left" }}>
        As of {moment().format("ll")} there are{" "}
        {props.labelsData.labelsArr.length} labels with {getBinsTotal(props)}{" "}
        label bins (avg.{" "}
        {(getBinsTotal(props) / props.labelsData.labelsArr.length).toFixed(1)}{" "}
        bins per label).
        <br />"
        <b>
          {props.labelsData.dataByDate[0]
            ? props.labelsData.dataByDate[0].name
            : null}
        </b>
        " is the most binned with{" "}
        {props.labelsData.dataByDate[0]
          ? props.labelsData.dataByDate[0].pv
          : null}{" "}
        bins.
      </p>
      <p className="p-2 py-0" style={{ fontSize: 18, textAlign: "left" }}>
        Let's break it down by period:
      </p>
    </>
  ) : (
    <br />
  );
}

/* :
 **********************************/
const getBinsTotal = (props) => {
  let binsCount = 0;
  props.labelsData?.labelsArr.forEach((l) => {
    binsCount += l.bins.length;
  });
  return binsCount;
};

export default ResultsDescription;
