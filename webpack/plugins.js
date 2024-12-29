const path = require("path");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const _MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _webpack = require("webpack");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HotModuleReplacementPlugin = new _webpack.HotModuleReplacementPlugin();
const CopyPlugin = require("copy-webpack-plugin");
let css = {};

if (process.env.NODE_ENV === "production") {
  // W trybie produkcyjnym używamy MiniCssExtractPlugin do wyodrębnienia CSS
  css = new HappyPack({
    id: "scss",
    threadPool: happyThreadPool,
    use: [
      {
        loader: _MiniCssExtractPlugin.loader, // Używamy MiniCssExtractPlugin.loader w produkcji
        options: {
          publicPath: "../",
        },
      },
      {
        loader: "css-loader",
        options: {
          minimize: true, // Minimalizowanie CSS
          sourceMap: true,
          importLoader: 2, // Umożliwia ładowanie SCSS w CSS
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: "sass-loader", // Kompilacja SCSS
      },
    ],
  });
} else {
  // W trybie deweloperskim używamy style-loader, by wstrzykiwać CSS do JS
  css = new HappyPack({
    id: "scss",
    loaders: [
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          postcssOptions: {
            plugins: [
              require("autoprefixer"),
              require("tailwindcss"), // Dodajemy TailwindCSS w trybie deweloperskim
            ],
          },
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  });
}

const copy = new CopyPlugin({
  patterns: [
    {
      from: "**/*.php",
      to: "../dist",
      context: "src",
    },
    {
      from: path.resolve(__dirname, "../src/img/assets/og-image.jpg"),
      to: "../dist/img/assets",
    },
  ],
});

const critical = new HtmlCriticalPlugin({
  base: path.join(path.resolve(__dirname), '../dist/'),
  src: 'index.html',
  dest: 'index.html',
  inline: true,
  minify: true,
  extract: true,
  width: 375,
  height: 565,
  penthouse: {
      blockJSRequests: false,
  }
});

const createHappy = function() {
  function createHappyPlugin(id, loaders) {
    return new HappyPack({
      id: id,
      loaders: loaders,
      threadPool: happyThreadPool,
      verbose: false,
    });
  }
  createHappyPlugin("scss", [
    "css-loader?importLoaders:1!postcss-loader?sourceMap:1!sass-loader",
  ])
}

const hmr = new _webpack.HotModuleReplacementPlugin();

const js = new HappyPack({
  id: "js",
  threadPool: happyThreadPool,
  loaders: ["babel-loader"], // Obsługa JS przez Babel
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
  filename: "css/style.[contenthash].css", // W nazwie pliku CSS będzie contenthash
});

const progressBar = new ProgressBarPlugin();

const provide = new _webpack.ProvidePlugin({
  _: "underscore",
});

module.exports = {
  copy: copy,
  
  critical: critical,
  css: css,
  happy: createHappy,
  hmr: hmr,
  js: js,
  progressBar: progressBar,
  provide: provide,
  HotModuleReplacementPlugin: HotModuleReplacementPlugin,
  MiniCssExtractPlugin: MiniCssExtractPlugin,
};
