const path = require("path");
const loaders = require("./loaders");
const plugins = require("./plugins");
const htmlPlugins = require("./webpack.htmlplugins");

module.exports = {
  mode: "development",

  entry: {
    app: "./src/app.js",
  },

  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    watchContentBase: true,
    hot: true,
    port: 8080,
    watchOptions: {
      ignored: /node_modules/,
    },
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].bundle.js",
    publicPath: "/",
  },

  module: {
    rules: [
      loaders.css,
      loaders.scss,
      loaders.fonts,
      loaders.images,
      loaders.js,
      loaders.ejs,
    ],
  },

  plugins: htmlPlugins().concat([
    plugins.progressBar,
    plugins.provide,
    plugins.MiniCssExtractPlugin,
    plugins.css,
    plugins.js,
    plugins.hmr,
  ]),

  optimization: {
    namedModules: true,
  },
};
