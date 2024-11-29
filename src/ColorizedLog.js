class ColorizedLog {
  constructor({
    textColor = "white",
    backgroundColor = "black",
    fontSize = "12px",
    fontFamily = "monospace",
    fontWeight = "normal",
    stepTop = 0,
    stepBottom = 0,
    tabBefore = false,
    lineTop = false,
    lineBottom = false,
    showWelcomeMessage = true,
  } = {}) {
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.fontWeight = fontWeight;
    this.stepTop = stepTop;
    this.stepBottom = stepBottom;
    this.tabBefore = tabBefore;
    this.lineTop = lineTop;
    this.lineBottom = lineBottom;
    this.showWelcomeMessage = showWelcomeMessage;

    if (showWelcomeMessage) {
      console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
      this.warn("I glad you are using GolorizedLogJs!");
      this.welcomeMessage();
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isValidColor(color) {
    const validColors = [
      "black",
      "red",
      "green",
      "yellow",
      "blue",
      "magenta",
      "cyan",
      "white",
      "grey",
      "gray",
      "lightblack",
      "lightred",
      "lightgreen",
      "lightyellow",
      "lightblue",
      "lightmagenta",
      "lightcyan",
      "lightwhite",
      "lightgrey",
      "lightgray",
      "darkblack",
      "darkred",
      "darkgreen",
      "darkyellow",
      "darkblue",
      "darkmagenta",
      "darkcyan",
      "darkwhite",
    ];
    return validColors.includes(color);
  }

  getColorCode(color) {
    const colors = {
      black: "30",
      red: "31",
      green: "32",
      yellow: "33",
      blue: "34",
      magenta: "35",
      cyan: "36",
      white: "37",
      grey: "90",
      gray: "90",
      lightblack: "90",
      lightred: "91",
      lightgreen: "92",
      lightyellow: "93",
      lightblue: "94",
      lightmagenta: "95",
      lightcyan: "96",
      lightwhite: "97",
      lightgrey: "90",
      lightgray: "90",
      darkblack: "30",
      darkred: "31",
      darkgreen: "32",
      darkyellow: "33",
      darkblue: "34",
      darkmagenta: "35",
      darkcyan: "36",
      darkwhite: "37",
    };
    return colors[color] || "30";
  }

  getBackgroundColorCode(color) {
    const colors = {
      black: "40",
      red: "41",
      green: "42",
      yellow: "43",
      blue: "44",
      magenta: "45",
      cyan: "46",
      white: "47",
      grey: "48",
      gray: "48",
      lightblack: "48",
      lightred: "49",
      lightgreen: "49",
      lightyellow: "49",
      lightblue: "49",
      lightmagenta: "49",
      lightcyan: "49",
      lightwhite: "49",
      lightgrey: "48",
      lightgray: "48",
      darkblack: "40",
      darkred: "41",
      darkgreen: "42",
      darkyellow: "43",
      darkblue: "44",
      darkmagenta: "45",
      darkcyan: "46",
      darkwhite: "47",
    };
    return colors[color] || "47";
  }

  formatStyles(string, logType, settings = {}) {
    let textColor = this.isValidColor(settings.textColor || this.textColor)
      ? settings.textColor || this.textColor
      : "black";
    let backgroundColor = this.isValidColor(
      settings.backgroundColor || this.backgroundColor
    )
      ? settings.backgroundColor || this.backgroundColor
      : "white";

    // Custom background for log types
    if (logType === "warn") {
      backgroundColor = "yellow";
      textColor = "black";
    } else if (logType === "error") {
      backgroundColor = "red";
      textColor = "white";
    } else if (logType === "info") {
      backgroundColor = "cyan";
      textColor = "black";
    }

    // ANSI escape codes
    const textColorCode = this.getColorCode(textColor);
    const backgroundColorCode = this.getBackgroundColorCode(backgroundColor);

    // Ensure the string length always fills the terminal width
    const terminalWidth = process.stdout.columns || 80;
    const paddedString = string.padEnd(terminalWidth, " ");

    return `\x1b[${textColorCode};${backgroundColorCode}m${paddedString}\x1b[0m`;
  }

  addPadding(string, settings = {}) {
    const stepTop =
      settings.stepTop !== undefined ? settings.stepTop : this.stepTop;
    const stepBottom =
      settings.stepBottom !== undefined ? settings.stepBottom : this.stepBottom;
    const topPadding = "\n".repeat(stepTop);
    const bottomPadding = "\n".repeat(stepBottom);
    return `${topPadding}${string}${bottomPadding}`;
  }

  addLine(string, toTop, toBottom) {
    const terminalWidth = process.stdout.columns || 80;
    const line = "-".repeat(terminalWidth);
    if (toTop && toBottom) {
      return `${line}\n${string}\n${line}`;
    } else if (toTop) {
      return `${line}\n${string}`;
    } else if (toBottom) {
      return `${string}\n${line}`;
    } else {
      return string;
    }
  }

  addTab(string, settings = {}) {
    const tabBefore =
      settings.tabBefore !== undefined ? settings.tabBefore : this.tabBefore;
    return tabBefore ? `--- ${string}` : string;
  }

  addAngleBrackets(string) {
    return ` << ${string} >> `;
  }

  formatString(string, logType, settings = {}) {
    let formattedString = this.addAngleBrackets(string);
    formattedString = this.addTab(formattedString, settings);

    const lineTop =
      settings.lineTop !== undefined ? settings.lineTop : this.lineTop;
    const lineBottom =
      settings.lineBottom !== undefined ? settings.lineBottom : this.lineBottom;

    if (lineTop || lineBottom) {
      formattedString = this.addLine(formattedString, lineTop, lineBottom);
    }

    if (settings.stepTop || settings.stepBottom) {
      formattedString = this.addPadding(formattedString, settings);
    }

    return this.formatStyles(formattedString, logType, settings);
  }

  log(string, settings = {}) {
    const formattedString = this.formatString(string, "log", settings);
    console.log(formattedString);
  }

  info(string, settings = {}) {
    const formattedString = this.formatString(string, "info", settings);
    console.info(formattedString);
  }

  warn(string, settings = {}) {
    const formattedString = this.formatString(string, "warn", settings);
    console.warn(formattedString);
  }

  error(string, settings = {}) {
    const formattedString = this.formatString(string, "error", settings);
    console.error(formattedString);
  }

  welcomeMessage() {
    this.info(
      `
      Welcome to GolorizedLogJs! 
      It is a simple library to upgrade your console.log.
      Example of usage:
      
      >>>> 
      const colorLog = new ColorLog({
        textColor: "grey", 
        backgroundColor: "black",
        fontSize: "12px",
        fontFamily: "monospace",
        fontWeight: "normal",
        stepTop: 1,
        stepBottom: 1,
        tabBefore: true,
        lineTop: true,
        lineBottom: true,
      });
      
      console.log("=== Server Environment ===");
      colorLog.stringLog("here is a log"); 
      colorLog.groupLog("group test");
      colorLog.info("info message");
      colorLog.warn("warning message");
      colorLog.error("error message");
      colorLog.groupEnd();
    `
    );
  }
}

module.exports = ColorizedLog;

// // Create an instance of ColorLog
// const colorLog = new ColorizedLog({
//   fontSize: "12px",
//   fontFamily: "monospace",
//   fontWeight: "normal",
//   stepTop: 0,
//   stepBottom: 0,
//   tabBefore: true,
//   lineTop: true,
//   lineBottom: true,
//   showWelcomeMessage: true,
// });

// // example of logging
// colorLog.log("here is a log");
// colorLog.info("info message");
// colorLog.warn("warning message");
// colorLog.error("error message");
