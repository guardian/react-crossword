// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = "style-loader";

const config = {
  entry: path.join(
    __dirname,
    "src",
    "javascripts",
    "crosswords",
    "crossword.js"
  ),
  externals: {
    react: "react",
    "react-dom": "react-dom",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "commonjs2",
  },
  resolve: {
    modules: [
      path.join(__dirname, "src", "javascripts"),
      path.join(__dirname, "src", "stylesheets"),
      "node_modules", // default location, but we're overiding above, so it needs to be explicit
    ],
    alias: {
      svgs: path.join(__dirname, "src", "svgs"),
    },
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
