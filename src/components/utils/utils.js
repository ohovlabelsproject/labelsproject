const utils = {
  arr: {
    shuffle: (arr) => {
      let currentIndex = arr.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [
          arr[randomIndex],
          arr[currentIndex],
        ];
      }
      return arr;
    },
  },
  date: {
    format: {
      ordinalNumber: (n) => {
        return (
          n +
          (n > 0
            ? ["th", "st", "nd", "rd"][
                (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
              ]
            : "")
        );
      },
    },
  },
  device: {
    orientation: {
      update: () => {
        const height = window.innerHeight;
        const minHeight = 625;
        const allowScroll =
          !utils.device.orientation.isLandscape() && height > minHeight;
        if (allowScroll) {
          document.body.classList.remove("overflow-hide");
          if (!document.body.classList.contains("overflow-hide-x")) {
            document.body.classList.add("overflow-x");
          }
        } else {
          if (!document.body.classList.contains("overflow-hide")) {
            document.body.classList.add("overflow-hide");
          }
        }
      },
      isLandscape: () => {
        if (window.innerWidth > window.innerHeight) {
          return true;
        }
      },
    },
    overflow: {
      addOverflowStyleFix: () => {
        document.body.classList.add("overflow-hide");
      },
    },
    touch: {
      preventDefaultTouchActions: () => {
        document
          .getElementById("app")
          .addEventListener("touchmove", (event) => {
            if (!utils.device.orientation.isLandscape()) {
              event.preventDefault();
            }
          });
      },
    },
  },
};

export default utils;
