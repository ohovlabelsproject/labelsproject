import moment from "moment";

/* Get today's date:
 *******************************************/
const d = new Date();
const currentDate = d.getDate();
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

  /* :
   ****************************************/
  getWeek: (labelsData) => {
    let bins = [];
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const sameWeek = binsByTimeUtils.isDateInThisWeek(binTimestamp);
        let binUnique = true;
        bins.forEach((b) => {
          if (b.label === l.label) {
            binUnique = false;
          }
        });
        if (sameWeek && binUnique) {
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
          const bD = new Date(bTimestamp);
          const bMonth = bD.getMonth();
          const bYear = bTimestamp.getFullYear();
          const bSameMonth = currentMonth === bMonth;
          const bSameYear = currentYear === bYear;
          if (bSameMonth && bSameYear) {
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
          const sameWeek =
            moment(binD).diff(this, "hours") <= -168 ? true : false;
          if (sameWeek) {
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
          const bSameWeek =
            moment(bTimestamp).diff(this, "hours") <= -168 ? true : false;
          if (bSameWeek) {
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

      console.log(labelsCp);
      return labelsCp;
    },
  },

  /* Today:
   ****************************************/
  today: {
    getLabels: (labelsData) => {
      let bins = [];
      labelsData.labelsArr.forEach((l) => {
        l.bins.forEach((bin) => {
          const binTimestamp = bin.binnedOn.toDate();
          const binD = new Date(binTimestamp);
          const binDate = binD.getDate();
          const binMonth = binD.getMonth();
          const binYear = binD.getFullYear();
          const sameDate = currentDate === binDate;
          const sameMonth = currentMonth === binMonth;
          const sameYear = currentYear === binYear;
          if (sameDate && sameMonth && sameYear) {
            bins.push(l);
          }
        });
      });
      return [...new Set(bins)];
    },
    getLabelsWithOnlyTodaysBins: (labelsArr) => {
      let relevantBins = {};
      let labelsCp = [];
      labelsArr.forEach((l) => {
        l.bins.forEach((binObj) => {
          const bTimestamp = binObj.binnedOn.toDate();
          const bD = new Date(bTimestamp);
          const bDate = bD.getDate();
          const bMonth = bD.getMonth();
          const bYear = bTimestamp.getFullYear();
          const bSameDate = currentDate === bDate;
          const bSameMonth = currentMonth === bMonth;
          const bSameYear = currentYear === bYear;
          if (bSameDate && bSameMonth && bSameYear) {
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

/* :
 ****************************************/
const binsByTimeUtils = {
  isDateInThisWeek: (date) => {
    // moment().subtract(10, 'days').calendar();
    //console.log(moment(date).fromNow());
    // 168 hours in a week...
    //console.log(moment(date).diff(this, "hours"));
    //
    //d.getTime() - startDate.getTime())/(1000*60*60*24.0)
    //currentDay
    /*
    const d = new Date();
    const todayDate = d.getDate();
    const todayDay = d.getDay();

    const firstDayOfWeek = new Date(d.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);

    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

    console.log(lastDayOfWeek);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;*/
  },
};

export default binsByTime;
