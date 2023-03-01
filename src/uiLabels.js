const credits = {
  graphics: {
    generate: (arr) => {
      var txt = "Graphics\n";

      arr.forEach((attr, index) => {
        txt += index + 1 + ". " + attr + "\n";
      });
      return txt;
    },
  },
};

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
        '"Our Hearings, Our Voice" wants to hear from you. We want to understand which words young people would like adults to stop using in the Children\'s Hearings System.',
      slide1b:
        "The next slide contains an instructional video for an activity we'd like your help with.",
      slide2: "Double-click/tap for fullscreen:",
      slide3: `Did you understand the instructions and do you agree to take part under the terms below?`,
    },
    action: {
      decline: "No, decline",
      consent: "Yes, I do!",
    },
  },
  termsOfUse: {
    text: "In taking part in this activity you, the user, understand that certain technologies (cookies, local storage, and database communications) will be used to give you a more pleasant user experience and to give us (OHOV) plenty of good quality data/information to work with. Data/information we store or transfer includes the likes of (1) information on user interactions with label boards, (2) submitted and/or binned labels, (3) the public IP address of users, (4) usage timestamps, (5) basic user device information, and (6) any communications had between users and OHOV. In agreeing with these terms and taking part in the labels activity you understand that the main aim of this project is to improve the experience of children and young people within the Scottish Hearing System and that any of your data/information collected and stored is done so with the utmost care with respect to privacy and protection — in accordance with the Data Protection Act 2018 (DPA 2018).",
  },
  instructions: {
    title: "Bin the words you'd like to get rid of",
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
    body: "Add your own label. It will be sent to our group and added to our list of words that we'd like adults to stop using in hearings*. This will help us understand which words children & young people most often wish to get rid of.",
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
  credits: credits.graphics.generate([
    "https://www.pexels.com/photo/photo-of-orange-dump-truck-toy-1186477/",
    "https://www.pexels.com/photo/yellow-duck-toy-beside-green-duck-toy-132464/",
    "https://www.vecteezy.com/vector-art/2219838-set-of-hand-drawn-arrow-doodles-on-white-background",
    "https://www.stickpng.com/img/miscellaneous/crumpled-paper/crumpled-paper-ball",
    "https://www.clipartmax.com/download/m2i8N4b1N4N4K9G6_computer-geek-rubber-duck-rubber-duck/",
  ]),
};

/*

Graphics
            https://www.pexels.com/photo/photo-of-orange-dump-truck-toy-1186477/
            https://www.pexels.com/photo/yellow-duck-toy-beside-green-duck-toy-132464/
            https://www.vecteezy.com/vector-art/2219838-set-of-hand-drawn-arrow-doodles-on-white-background
            https://www.stickpng.com/img/miscellaneous/crumpled-paper/crumpled-paper-ball
            https://www.clipartmax.com/download/m2i8N4b1N4N4K9G6_computer-geek-rubber-duck-rubber-duck/
            Videos & Music
            https://www.pexels.com/video/side-view-silhouette-of-a-person-moving-5739693/
            https://www.pexels.com/video/fingers-pointing-at-a-sad-woman-7640667/
            https://www.pexels.com/video/crop-group-stacking-hands-together-6192775/
            https://www.pexels.com/video/writing-notes-on-stick-pads-6774467/
            https://www.pexels.com/video/a-man-crumbling-used-papers-with-errors-4873122/
            https://www.pexels.com/video/crumpled-paper-balls-falling-into-a-bin-11485778/
            https://www.pexels.com/video/a-teenage-boy-undergoing-counselling-4100356/
            https://www.pexels.com/video/man-people-office-relationship-4100354/
            https://pixabay.com/music/solo-guitar-the-beat-of-nature-122841/
            Fonts & Icons https://youssef-habchi.com/fonts/road-rage
            */

export default uiLabels;
