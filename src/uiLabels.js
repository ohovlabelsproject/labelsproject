const uiLabels = {
  feedback: {
    successfulBin: {
      header: "",
      headerIcon: "fa fa-check-square-o",
      body: "A well-trained duck is delivering it to us.",
    },
  },
  welcome: {
    header: {
      title: "Welcome!",
    },
    body: {
      slide1:
        "At \"Our Hearings, Our Voice\" we're always trying to do what's best for young people in the Children's Hearing System. For this, we need your help...",
      slide2:
        'We need to know about labels you find stigmitising (unfair), so we could then "bin" them from our language. As such, we created an activity...',
      slide3:
        'A "drag n drop" game. In this activity you\'ll see one (or more) boards with labels on them. Drag problem labels into the "bin". How about it?',
    },
    action: {
      decline: "No thanks",
      consent: "Yes, sure!",
    },
  },
  instructions: {
    title: "Bin the labels you find stigmatising",
    validation: {
      hasBannedWord: "Must use appropriate language",
      hasDuplicate: "Must not be an existing label",
    },
    alerts: {
      navAlert: {
        moreLabelsNextBoard: "more on next boards!",
      },
    },
  },
  noLabelsToLoad: {
    msg: "There are currently 0 labels to load. Try adding your own!",
  },
  labelSubmission: {
    body: "Add your own label. It will be counted as a submission & may appear for others*.",
    footnote: "**If it gets enough quacks from duck mods.",
    feedback: {
      userAlreadyAdded: "You already submitted this label!",
      successfulSubmission:
        "Thank you. Your label was successfully submitted. \n\nIt may take some time for it to appear on the app, but be assured it will be shared with our language group who are working on changing language in the hearings system. Your submissions are greatly appreciated.",
    },
  },
  date: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  footer: "Our Hearings, Our Voice",
};

export default uiLabels;
