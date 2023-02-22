//import moment from "moment";

// const date = moment().format("L");
const resultsPrintPage = {
  header: {
    generate: () => {
      const subtitle = `Findings`;
      return (
        subtitle +
        "\n\nTo date (0/00/00) there are X labels for users to choose from (10 of which were submitted by users themselves). Of these labels, there have been 100 binning instances. So far the most binned label is 'respite'. It has been binned 50 times (which is 20 above the average)."
      );
    },
  },
  body: {
    generate: (labelsData) => {
      const tableCells =
        labelsData && labelsData.labelsArr && labelsData.dataByDate
          ? labelsData.dataByDate
              .sort((a, b) => b.pv - a.pv)
              .map((label, index) => {
                return `"${label.name}" - ${label.pv}\n\n`;
              })
              .join("")
          : null;

      return (
        "\n\n" +
        tableCells +
        "\n\nFindings: there are 10 labels and 100 bins. The most binned label is 'respite' so far with 5... .. the average bin amount is X ... meaning a standard deviation of Y... meaning any label that has been binned equal to or more than Z times is a particularly stigmatizing label (although since x users have contributed there this is not a statistically significant example).. ....\n"
      );
    },
  },
  container: {
    generate: (labelsData) => {
      return `${resultsPrintPage.header.generate()}\n${resultsPrintPage.body.generate(
        labelsData
      )}`;
    },
  },
};

export default resultsPrintPage;
