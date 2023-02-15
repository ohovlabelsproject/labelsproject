// Get today's date:
const d = new Date();
const currentDate = d.getDay();
const currentMonth = d.getMonth();
const currentYear = d.getFullYear();

const binsByTime = {
  getAll: (labelsData) => {
    let bins = [];
    // Cycle through all bins:
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach(() => {
        // Check bin hasn't already been pushed:
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
  getYear: (labelsData) => {
    let bins = [];
    // Cycle through all bins:
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const binD = new Date(binTimestamp);
        const binYear = binD.getFullYear();
        // Check bin hasn't already been pushed:
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

  getMonth: (labelsData) => {
    let bins = [];
    // Cycle through all bins:
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const binD = new Date(binTimestamp);
        const binMonth = binD.getMonth();
        const binYear = binD.getFullYear();
        const sameMonth = currentMonth === binMonth;
        const sameYear = currentYear === binYear;
        // Check bin hasn't already been pushed:
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

  getWeek: (labelsData) => {
    let bins = [];
    // Cycle through all bins:
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const sameWeek = binsByTimeUtils.isDateInThisWeek(binTimestamp);
        // Check bin hasn't already been pushed:
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

  getToday: (labelsData) => {
    let bins = [];
    // Cycle through all bins:
    labelsData.labelsArr.forEach((l) => {
      l.bins.forEach((bin) => {
        const binTimestamp = bin.binnedOn.toDate();
        const binD = new Date(binTimestamp);
        const binDate = binD.getDay();
        const binMonth = binD.getMonth();
        const binYear = binD.getFullYear();
        const sameDate = currentDate === binDate;
        const sameMonth = currentMonth === binMonth;
        const sameYear = currentYear === binYear;
        // Check bin hasn't already been pushed:
        let binUnique = true;
        bins.forEach((b) => {
          if (b.label === l.label) {
            binUnique = false;
          }
        });
        if (sameDate && sameMonth && sameYear && binUnique) {
          bins.push(l);
        }
      });
    });
    return bins;
  },
};

const binsByTimeUtils = {
  isDateInThisWeek: (date) => {
    const todayDate = d.getDate();
    const todayDay = d.getDay();
    const firstDayOfWeek = new Date(d.setDate(todayDate - todayDay));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
    return date >= firstDayOfWeek && date <= lastDayOfWeek;
  },
};

export default binsByTime;
