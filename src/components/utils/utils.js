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
      checkDevice: () => {
        if (window.matchMedia("(max-width: 480px)").matches) {
          // Viewport is less or equal to 700 pixels wide
          return 0;
        } else if (window.matchMedia("(max-width: 768px)").matches) {
          return 1;
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
          return 2;
        } else if (window.matchMedia("(max-width: 1200px)").matches) {
          return 3;
        } else if (window.matchMedia("(max-width: 2200px)").matches) {
          return 4;
        } else {
          return 5;
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
  ui: {
    closeWindow: () => {
      const myWindow = window.open("", "_self");
      myWindow.document.write("");
      setTimeout(() => {
        myWindow.close();
      }, 100);
    },
    animation: {
      betweenBoards: {
        apply: (board) => {
          const boardEl = document.getElementById(board);
          boardEl.classList.add("animate__animated");
          boardEl.classList.add("animate__fadeIn");
        },
        snapback: (labelsData) => {
          const snapTimeout = setTimeout(() => {
            for (let i = 0; i < labelsData.labelsArr.length; i++) {
              let stickynote = document.getElementById("stickynote-" + i);
              if (stickynote) {
                if (labelsData.labelsArr[i].hasUserBinnedIt) {
                  stickynote.style.display = "none";
                } else {
                  stickynote.style.position = "relative";
                  stickynote.style.display = "flex";
                }
                stickynote.style.left = 0;
                stickynote.style.top = 0;
              }
            }
            clearTimeout(snapTimeout);
          }, 100);
        },
        removeOnDelay: (board, delay) => {
          const boardEl = document.getElementById(board);
          const removalTimeout = setTimeout(() => {
            boardEl.classList.remove("animate__animated");
            boardEl.classList.remove("animate__fadeIn");
            clearTimeout(removalTimeout);
          }, delay);
        },
      },
    },
  },
};

export default utils;
