const helpers = {
  labels: {
    arr: {
      roundUpLength: (labelsArr) => {
        let neededToPush;
        if (labelsArr.length < 9) {
          neededToPush = 9 - labelsArr.length;
        } else if (labelsArr.length > 9 && labelsArr.length < 18) {
          neededToPush = 18 - labelsArr.length;
        } else if (labelsArr.length > 18 && labelsArr.length < 27) {
          neededToPush = 27 - labelsArr.length;
        } else if (labelsArr.length > 27 && labelsArr.length < 36) {
          neededToPush = 36 - labelsArr.length;
        } else if (labelsArr.length > 36 && labelsArr.length < 45) {
          neededToPush = 45 - labelsArr.length;
        } else if (labelsArr.length > 45 && labelsArr.length < 54) {
          neededToPush = 54 - labelsArr.length;
        } else if (labelsArr.length > 54 && labelsArr.length < 63) {
          neededToPush = 63 - labelsArr.length;
        }
        return neededToPush;
      },
    },
  },
};

export default helpers;
