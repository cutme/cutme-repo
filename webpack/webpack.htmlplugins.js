const HtmlWebpackPlugin = require("html-webpack-plugin");
const templateFileMapper = require("./webpack.templates"); // Poprawny import zmiennej

const htmlPlugins = () => {
  return templateFileMapper.map(entry => {
    const options = {
      template: entry.template,
      filename: entry.file,
      minify: {
        collapseWhitespace: process.env.NODE_ENV === "production",
        removeScriptTypeAttributes: true,
      },
    };
    
    if (entry.title) {
        options.templateParameters = {
          title: entry.title,
          og: entry.og,
          dev: entry.dev,
          prod: entry.prod
        };
    }

    return new HtmlWebpackPlugin(options);
  });
};

module.exports = htmlPlugins;
