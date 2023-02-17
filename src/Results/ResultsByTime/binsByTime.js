/* Get today's date:
 *******************************************/
const d = new Date();
const currentDate = d.getDay();
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

  /* :
   ****************************************/
  getToday: (labelsData) => {
    let bins = [];
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

/* :
 ****************************************/
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
