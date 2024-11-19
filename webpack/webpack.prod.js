process.env.NODE_ENV = 'production';
const path = require('path');
const loaders = require('./loaders');
const plugins = require('./plugins');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

console.log(process.env.NODE_ENV);

const templateFileMapper = [
    { template: "./src/index.ejs", file: "index.html", title: "", og: "og.jpg", dev: "", prod: ""  },
]

const htmlPlugins = () => {
  return templateFileMapper.map(entry => {
    const options = {
      template: entry.template,
      filename: entry.file,
      minify: {
        removeScriptTypeAttributes: true,
        collapseWhitespace: true,
        removeComments: true
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


module.exports = {
    mode: 'production',
    devtool: 'source-map',
    
    entry: {
        'app.js': [
          path.resolve(__dirname, '../src/app.js')
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "js/[name].[contenthash].js",
        publicPath: ''
    },

    module: {
    	rules: [
			loaders.css,
			loaders.scss,
            loaders.fonts,
            loaders.images,
            loaders.js,
            loaders.ejs
        ]
    },
    
    plugins: htmlPlugins().concat([
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            _: "underscore"
        }),
        
        plugins.MiniCssExtractPlugin,

        createHappyPlugin('scss', ['css-loader?importLoaders:1!postcss-loader?sourceMap:1!sass-loader']),
        
        plugins.js,
        new CopyPlugin({
            patterns: [
            {
                from: '**/*.php',
                to: '../dist',
            	context: 'src'
            },
            {
                from: path.resolve(__dirname, '../src/img/assets/og-image.jpg'),
                to: '../dist/img/assets'
            },
            ],
        }),
        
        new HtmlCriticalPlugin({
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
        })
        

    ]),
	
	optimization: {
	    minimize: true,
	    minimizer: [new TerserPlugin()],
        namedModules: true, // NamedModulesPlugin()
        noEmitOnErrors: true, // NoEmitOnErrorsPlugin
        concatenateModules: true //ModuleConcatenationPlugin
    }
};


function createHappyPlugin(id, loaders) {
    return new HappyPack({
        id: id,
        loaders: loaders,
        threadPool: happyThreadPool,
        verbose: false,
    });
}

