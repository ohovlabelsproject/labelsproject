import moment from "moment";

/* Get today's date:
 *******************************************/
const d = new Date();
const currentMonth = d.getMonth();
const currentYear = d.getFullYear();

const binsByTime = {
  /* 1. Get all labels. 
     2. Cycle through the bins.
     3. Find those with year in their timestamp. 
     4. If not in bins array, push.
     5. Return bins array.
   *********************************************/
  getAll: (labelsData) => {
    let bins = [];
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach(() => {
        let binUnique = true;
        bins.forEach((b) => {
          if (b.label === l.label) binUnique = false;
        });
        if (binUnique) {
          bins.push(l);
        }
      });
    });
    return bins;
  },

  /* :
   ****************************************/
  getYear: (labelsData) => {
    let bins = [];
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const binD = new Date(binTimestamp);
        const binYear = binD.getFullYear();
        let binUnique = true;
        bins.forEach((b) => {
          if (b.label === l.label) binUnique = false;
        });
        if (currentYear === binYear && binUnique) {
          bins.push(l);
        }
      });
    });
    return bins;
  },

  /* :
   ****************************************/
  getMonth: (labelsData) => {
    let bins = [];
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const binD = new Date(binTimestamp);
        const binMonth = binD.getMonth();
        const binYear = binD.getFullYear();
        const sameMonth = currentMonth === binMonth;
        const sameYear = currentYear === binYear;
        let binUnique = true;
        bins.forEach((b) => {
          if (b.label === l.label) binUnique = false;
        });
        if (sameMonth && sameYear && binUnique) {
          bins.push(l);
        }
      });
    });
    return bins;
  },

  /* Year:
   ****************************************/
  year: {
    getLabels: (labelsData) => {
      let bins = [];
      labelsData.labelsArr.forEach((l) => {
        l.bins.forEach((bin) => {
          const binTimestamp = bin.binnedOn.toDate();
          const binD = new Date(binTimestamp);
          const binYear = binD.getFullYear();
          const sameYear = currentYear === binYear;
          if (sameYear) {
            bins.push(l);
          }
        });
      });
      return [...new Set(bins)];
    },
    getLabelsWithOnlyYearsBins: (labelsArr) => {
      let relevantBins = {};
      let labelsCp = [];
      labelsArr.forEach((l) => {
        l.bins.forEach((binObj) => {
          const bTimestamp = binObj.binnedOn.toDate();
          const bYear = bTimestamp.getFullYear();
          const bSameYear = currentYear === bYear;
          if (bSameYear) {
            if (!relevantBins[l.label]) relevantBins[l.label] = {};
            if (relevantBins[l.label].bins) {
              relevantBins[l.label].bins.push(binObj);
            } else {
              relevantBins[l.label].bins = [];
              relevantBins[l.label].bins.push(binObj);
            }
          }
        });
      });
      for (const relevantBin in relevantBins) {
        labelsCp.push({
          label: relevantBin?.toLowerCase(),
          ...relevantBins[relevantBin],
        });
      }
      return labelsCp;
    },
  },

  /* Month:
   ****************************************/
  month: {
    getLabels: (labelsData) => {
      let bins = [];
      labelsData.labelsArr.forEach((l) => {
        l.bins.forEach((bin) => {
          const binTimestamp = bin.binnedOn.toDate();
          const binD = new Date(binTimestamp);
          const binMonth = binD.getMonth();
          const binYear = binD.getFullYear();
          const sameMonth = currentMonth === binMonth;
          const sameYear = currentYear === binYear;
          if (sameMonth && sameYear) {
            bins.push(l);
          }
        });
      });
      return [...new Set(bins)];
    },
    getLabelsWithOnlyMonthsBins: (labelsArr) => {
      let relevantBins = {};
      let labelsCp = [];
      labelsArr.forEach((l) => {
        l.bins.forEach((binObj) => {
          const bTimestamp = binObj.binnedOn.toDate();
          const bSameMonth =
            moment(bTimestamp).diff(this, "months") < 1 ? true : false;
          if (bSameMonth) {
            if (!relevantBins[l.label]) relevantBins[l.label] = {};
            if (relevantBins[l.label].bins) {
              relevantBins[l.label].bins.push(binObj);
            } else {
              relevantBins[l.label].bins = [];
              relevantBins[l.label].bins.push(binObj);
            }
          }
        });
      });
      for (const relevantBin in relevantBins) {
        labelsCp.push({
          label: relevantBin?.toLowerCase(),
          ...relevantBins[relevantBin],
        });
      }
      return labelsCp;
    },
  },

  /* Week:
   ****************************************/
  week: {
    getLabels: (labelsData) => {
      let bins = [];
      labelsData.labelsArr.forEach((l) => {
        l.bins.forEach((bin) => {
          const binTimestamp = bin.binnedOn.toDate();
          const binD = new Date(binTimestamp);
          const overWeekAgo =
            moment(binD).diff(this, "hours") <= -168 ? true : false;
          if (!overWeekAgo) {
            bins.push(l);
          }
        });
      });
      return [...new Set(bins)];
    },
    getLabelsWithOnlyWeeksBins: (labelsArr) => {
      let relevantBins = {};
      let labelsCp = [];
      labelsArr.forEach((l) => {
        l.bins.forEach((binObj) => {
          const bTimestamp = binObj.binnedOn.toDate();
          const bD = new Date(bTimestamp);
          const overWeekAgo =
            moment(bD).diff(this, "hours") <= -168 ? true : false;
          if (!overWeekAgo) {
            if (!relevantBins[l.label]) relevantBins[l.label] = {};
            if (relevantBins[l.label].bins) {
              relevantBins[l.label].bins.push(binObj);
            } else {
              relevantBins[l.label].bins = [];
              relevantBins[l.label].bins.push(binObj);
            }
          }
        });
      });
      for (const relevantBin in relevantBins) {
        labelsCp.push({
          label: relevantBin?.toLowerCase(),
          ...relevantBins[relevantBin],
        });
      }
      return labelsCp;
    },
  },

  /* Past 24 hours:
   ****************************************/
  past24hrs: {
    getLabels: (labelsData) => {
      let bins = [];
      labelsData.labelsArr.forEach((l) => {
        l.bins.forEach((bin) => {
          const binTimestamp = bin.binnedOn.toDate();
          const binD = new Date(binTimestamp);
          const over24HoursAgo =
            moment(binD).diff(this, "hours") <= -24 ? true : false;
          if (!over24HoursAgo) {
            bins.push(l);
          }
        });
      });
      return [...new Set(bins)];
    },
    getLabelsWithOnlyPast24hrsBins: (labelsArr) => {
      let relevantBins = {};
      let labelsCp = [];
      labelsArr.forEach((l) => {
        l.bins.forEach((binObj) => {
          const bTimestamp = binObj.binnedOn.toDate();
          const bD = new Date(bTimestamp);
          const over24HoursAgo =
            moment(bD).diff(this, "hours") <= -24 ? true : false;
          if (!over24HoursAgo) {
            if (!relevantBins[l.label]) relevantBins[l.label] = {};
            if (relevantBins[l.label].bins) {
              relevantBins[l.label].bins.push(binObj);
            } else {
              relevantBins[l.label].bins = [];
              relevantBins[l.label].bins.push(binObj);
            }
          }
        });
      });
      for (const relevantBin in relevantBins) {
        labelsCp.push({
          label: relevantBin?.toLowerCase(),
          ...relevantBins[relevantBin],
        });
      }
      return labelsCp;
    },
  },
};

export default binsByTime;
