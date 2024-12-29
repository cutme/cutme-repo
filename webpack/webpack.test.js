process.env.NODE_ENV = "test";
const path = require("path");
const loaders = require("./loaders");
const plugins = require("./plugins");
const TerserPlugin = require("terser-webpack-plugin");
const htmlPlugins = require("./webpack.htmlplugins");

module.exports = {
  mode: "none",
  devtool: "source-map",

  entry: {
    "app.js": [path.resolve(__dirname, "../src/app.js")],
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash].js",
    publicPath: "",
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
    plugins.happy,
    plugins.js,
    //plugins.critical
    //plugins.copy
  ]),

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // Usuń wszystkie komentarze
          },
        },
        extractComments: false, // Nie zapisuj komentarzy do osobnego pliku
      }),
    ],
    namedModules: true, // NamedModulesPlugin()
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true, //ModuleConcatenationPlugin
  },
};

console.log(process.env.NODE_ENV);