const uiLabels = {
  debug: {
    orientations: ["landscape", "portrait"],
    devices: [
      "mobile",
      "tablet",
      "small screen device",
      "medium screen device",
      "big screen device",
      "unknown device",
    ],
    overflow: ["fits", "overflows/needs scroll"],
  },
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
        "At \"Our Hearings, Our Voice\" we're always trying to do what's best for young people. For this, we need your help! The next slide contains an instructional video for an activity in which we would love for you to participate.",
      slide2: "Double-click/tap for fullscreen:",
      slide3: `Did you understand the instructions and do you agree to participate under the following terms?`,
    },
    action: {
      decline: "No, decline",
      consent: "Yes, I do!",
    },
  },
  termsOfUse: {
    text: 'In participating with this activity the user acknowledges that cookies, local storage, and database operations are used to enhance user experience and improve the quality of data received by "Our Hearings, Our Voice" (OHOV). Data stored and conveyed through these technologies include—but are not limited to—(1) information on user interactions with label boards, (2) submitted and/or binned labels, (3) the public IP address of users (IPv4), (4) usage timestamps, (5) viewport dimensions of user devices, and (6) any correspondances had between users and OHOV. In agreeing with these terms you understand that the primary goal of this project is improve the experience of children and young people within the Scottish Hearing System and that any user data collected and stored is done so with the utmost care with respect to privacy and protection—subject to provisions enumerated in the Data Protection Act 2018 (DPA 2018).',
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
    body: 'Add your own label. It will be available for others to interact with it*. It will also be logged as you "binning" it.',
    footnote: "**If it gets enough quacks from duck mods.",
    feedback: {
      userAlreadyAdded: "You already submitted this label!",
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
