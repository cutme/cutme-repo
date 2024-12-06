const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');

const templateFileMapper = [
    { template: "./src/index.ejs", file: "index.html" },
];

const htmlPlugins = () => {
    return templateFileMapper.map(entry => {
        return new HtmlWebpackPlugin({
            template: entry.template,
            filename: entry.file,
            templateParameters: {
                className: 'dev',
            },
            inject: 'body', // Wstrzyknij skrypty w odpowiednim miejscu w pliku HTML
        });
    });
};

module.exports = {
    mode: 'development',

    entry: {
        app: "./src/app.js",
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        watchContentBase: true, // Monitoruj zmiany w plikach HTML i CSS
        hot: true, // Włącz Hot Module Replacement
        port: 8080,
        watchOptions: {
            ignored: /node_modules/, // Ignoruj zmiany w node_modules
        },
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].bundle.js",
        publicPath: '/',
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
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            _: "underscore",
        }),
        plugins.MiniCssExtractPlugin,
        plugins.css,
        plugins.js,
        new webpack.HotModuleReplacementPlugin(), // Włącz HMR
    ]),

    optimization: {
        namedModules: true, // Użyj nazwanych modułów
    },
};
