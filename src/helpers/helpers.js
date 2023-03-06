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
        } else if (labelsArr.length > 63 && labelsArr.length < 72) {
          neededToPush = 72 - labelsArr.length;
        } else if (labelsArr.length > 72 && labelsArr.length < 81) {
          neededToPush = 81 - labelsArr.length;
        } else if (labelsArr.length > 81 && labelsArr.length < 90) {
          neededToPush = 90 - labelsArr.length;
        } else if (labelsArr.length > 90 && labelsArr.length < 99) {
          neededToPush = 99 - labelsArr.length;
        } else if (labelsArr.length > 99 && labelsArr.length < 108) {
          neededToPush = 108 - labelsArr.length;
        } else if (labelsArr.length > 108 && labelsArr.length < 117) {
          neededToPush = 117 - labelsArr.length;
        } else if (labelsArr.length > 117 && labelsArr.length < 126) {
          neededToPush = 126 - labelsArr.length;
        } else if (labelsArr.length > 126 && labelsArr.length < 135) {
          neededToPush = 135 - labelsArr.length;
        }
        return neededToPush;
      },
    },
  },
};

export default helpers;
