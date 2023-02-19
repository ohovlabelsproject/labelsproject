import moment from "moment";

const dashes = "_________ _ _ _";

const resultsPrintPage = {
  header: {
    generate: () => {
      const title = '"Our Hearing, Our Voices" - Labels App Data';
      const subtitle = moment().format("LL");
      return "\n" + dashes + "\n\n" + title + "\n\n" + subtitle + "\n" + dashes;
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
        dashes +
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
