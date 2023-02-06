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
};

export default utils;
