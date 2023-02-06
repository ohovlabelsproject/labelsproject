import utils from "../components/utils/utils";
import uiLabels from "../uiLabels";

const modreport = {
  generate: () => {
    const d = new Date();
    const day = uiLabels.date.days[d.getDay()];
    const dateOrdinal = utils.date.format.ordinalNumber(d.getDate());
    const dateFullYear = d.getFullYear();
    const dateFormatted = `${day} ${dateOrdinal}, ${dateFullYear}`;
    const styleCenter =
      "position: absolute; left: 0; right: 0; margin-left: auto; margin-right: auto;";
    const title = `Stigmatising Results — Feedback`;
    //
    return `<div style="font-family: sans-serif; ${styleCenter}; text-align: center; width: 550px;">
        <img src="https://usercontent.one/wp/www.ohov.co.uk/wp-content/uploads/2019/08/OHOV_final_logo_colour-2.png" width="100px"/>
        <h1>${title}</h1>
        <p>Report generated: ${dateFormatted}</p>
        <table border="1px" style="${styleCenter} width: 400px; text-align: center;">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Posted (Time & IP)</th>
                    <th>Bin Count #</th>
                </tr>
            </thead>
            <tbody>
            ${[
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
              { label: "victim", timestamp: "0.0.1", count: 1 },
            ]
              .map((l) => {
                return `<tr>
                    <td>${l.label}</td>
                    <td>${l.timestamp} - 123.789.1</td>
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
