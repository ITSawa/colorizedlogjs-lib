ColorizedLog is a Node.js package designed for displaying colored logs in the console with a variety of customization options. It provides an easy way to format your logs with different colors, font sizes, margins, and more, making your console output more readable and visually appealing.

Installation
To install the package, run the following command:

c

npm install colorizedlogjs
Usage
To use ColorizedLog, require the package in your project and create an instance with custom settings. Here’s an example of how to use it:

javascript

const ColorizedLog = require('colorized-log');

// Create an instance of ColorizedLog with custom settings
const colorLog = new ColorizedLog({
  textColor: "grey",             // Text color (default "white")
  backgroundColor: "black",      // Background color (default "black")
  fontSize: "12px",              // Font size (default "12px")
  fontFamily: "monospace",       // Font family (default "monospace")
  fontWeight: "normal",          // Font weight (default "normal")
  stepTop: 1,                    // Top margin before the message (default 0)
  stepBottom: 1,                 // Bottom margin after the message (default 0)
  tabBefore: true,               // If true, adds tab before the message (default false)
  lineTop: true,                 // If true, adds a line at the top (default false)
  lineBottom: true,              // If true, adds a line at the bottom (default false)
  showWelcomeMessage: true,      // If true, shows a welcome message (default true)
});

// Example usage
colorLog.log("This is a regular message");
colorLog.info("This is an informational message");
colorLog.warn("This is a warning message");
colorLog.error("This is an error message");
Options
You can customize the appearance of your logs by passing an options object to the ColorizedLog constructor. The available options are:

textColor: The color of the text (default is "white").
backgroundColor: The background color of the message (default is "black").
fontSize: The font size of the message (default is "12px").
fontFamily: The font family used for the message (default is "monospace").
fontWeight: The weight of the font (default is "normal").
stepTop: The top margin before the message (default is 0).
stepBottom: The bottom margin after the message (default is 0).
tabBefore: If true, a tab is added before the message (default is false).
lineTop: If true, a line is added at the top (default is false).
lineBottom: If true, a line is added at the bottom (default is false).
showWelcomeMessage: If true, a welcome message will be displayed when the logger is initialized (default is true).
Example Customization
You can also apply individual customizations to specific log messages:

javascript

// Customize a message with specific colors and font size
colorLog.log("This is a custom message", {
  textColor: "blue",
  backgroundColor: "yellow",
  fontSize: "16px"
});
Constructor Options Example
javascript

new ColorizedLog({
  textColor: "white",             // Text color (default "white")
  backgroundColor: "black",      // Background color (default "black")
  fontSize: "12px",              // Font size (default "12px")
  fontFamily: "monospace",       // Font family (default "monospace")
  fontWeight: "normal",          // Font weight (default "normal")
  stepTop: 0,                    // Top margin (default 0)
  stepBottom: 0,                 // Bottom margin (default 0)
  tabBefore: false,              // Tab before the message (default false)
  lineTop: false,                // Line on top of the message (default false)
  lineBottom: false,             // Line below the message (default false)
  showWelcomeMessage: true,      // Show a welcome message (default true)
});
Example of Logs with Lines and Margins
You can add lines above and below your messages, as well as control the margins:

javascript

// Example of a warning message with a line at the top and bottom
colorLog.warn("Warning message with lines", {
  lineTop: true,
  lineBottom: true
});
