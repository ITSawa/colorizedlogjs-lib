const path = require("path");

module.exports = {
  entry: "./src/ColorLog.js",
  output: {
    filename: "colorlog.js",
    path: path.resolve(__dirname, "dist"),
    library: "ColorLog",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
