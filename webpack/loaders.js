const devMode = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const plugins = require("./plugins");
let scss = {};

const css = {
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader',               
    'postcss-loader',           
  ],
};

if (process.env.NODE_ENV === "production") {
  scss = {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../",
        },
      },
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
  };
} else {
  scss = {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader, // Użycie MiniCssExtractPlugin w produkcji
        options: {
          publicPath: "../",
        },
      },
      "css-loader",
      "postcss-loader",
      "sass-loader",
    ],
  };
}


const ejs = {
  test: /\.ejs$/,
  use: [
    {
      loader: "ejs-compiled-loader",
    },
  ],
};

const fonts = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  exclude: /img/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "fonts/[name].[contenthash].[ext]",
      },
    },
  ],
};

const images = {
  test: /\.(jpg|png|svg|gif|webp|ico|mp4|pdf)$/i,
  exclude: /fonts/,
  use: [
    {
      loader: "file-loader",
      options: {
        name: "[name].[contenthash].[ext]",
        useRelativePath: true,
      },
    },
    {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          enabled: false,
          progressive: false,
          quality: 70,
        },
      },
    },
  ],
};

const js = {
  test: /\.js$/,
  exclude: /node_modules/,
  loader: "happypack/loader?id=js",
};

module.exports = {
  ejs: ejs,
  fonts: fonts,
  images: images,
  js: js,
  css: css,
  scss: scss,
};
