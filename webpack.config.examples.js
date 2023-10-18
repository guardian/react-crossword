const path = require("path");
const baseConfig = require("./webpack.config");

module.exports = {
  ...baseConfig(),
  mode: "production",
  entry: {
    examples: path.join(__dirname, "examples", "exampleCrossword.js"),
  },
  devServer: {
    static: path.join(__dirname, "examples/"),
    port: 3000,
    open: true,
    client: {
      overlay: false,
    },
  },
  output: {
    filename: "examples.js",
    path: path.join(__dirname, "examples", "lib"),
  },
};

console.log(path.join(__dirname, "examples/"));
