import moment from "moment";

const resultsGenerateFile = {
  csv: (o) => {
    const head = `Label,Times Binned\n`;
    const body =
      o.labelsData && o.labelsData.labelsArr && o.labelsData.dataByDate
        ? o.labelsData.dataByDate
            .sort((a, b) => b.pv - a.pv)
            .map((label) => {
              return `"""${label.name}""",${label.pv}\n`;
            })
            .join("")
        : null;
    return head + body;
  },

  //
  txt: (o) => {
    const formattedDate = moment().format("ll");
    const mainTxt = `Results report\n---------------\n\nAs of ${formattedDate} there are ${
      o.labelsData.labelsArr.length
    } labels with ${getBinsTotal()} bin instances (avg. ${(
      getBinsTotal({ labelsData: o.labelsData }) / o.labelsData.labelsArr.length
    ).toFixed(1)} per label).\n"${
      o.labelsData.dataByDate[0].name
    }" is the most binned label overall - having been binned ${
      o.labelsData.dataByDate[0].pv
    } times so far.\n\n\nHere are the results in descending order:\n\n\n`;
    const tabularData =
      o.labelsData && o.labelsData.labelsArr && o.labelsData.dataByDate
        ? o.labelsData.dataByDate
            .sort((a, b) => b.pv - a.pv)
            .map((label) => {
              return `"${label.name}" - ${label.pv}\n\n`;
            })
            .join("")
        : null;
    return mainTxt + tabularData;
  },
};

//
const getBinsTotal = (o) => {
  let binsCount = 0;
  o.labelsData?.labelsArr.forEach((l) => {
    binsCount += l.bins.length;
  });
  return binsCount;
};

export default resultsGenerateFile;
