const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const _MiniCssExtractPlugin = require('mini-css-extract-plugin');
const _webpack = require('webpack');

const HotModuleReplacementPlugin = new _webpack.HotModuleReplacementPlugin();

let css = {};

if (process.env.NODE_ENV === 'production') {

    css = new HappyPack({
        id: 'scss',
        threadPool: happyThreadPool,
        use: [
            {
                loader: 'style-loader',
            },
    
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true,
                    importLoader: 2
                }
            },
    
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
    
            {
                loader: 'sass-loader'
            }
        ]
    });

} else {
    
    css = new HappyPack({
        id: 'scss',
        threadPool: happyThreadPool,
        use: [
            {
                loader: 'style-loader',
            },
    
            {
                loader: 'css-loader',
                options: {
                    minimize: true,
                    sourceMap: true,
                    importLoader: 2
                }
            },
    
            {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss'
                }
            },
    
            {
                loader: 'sass-loader'
            }
        ]
    });    
}

const js = new HappyPack({
    id: 'js',
    threadPool: happyThreadPool,
    loaders: ['babel-loader']
});

const MiniCssExtractPlugin = new _MiniCssExtractPlugin({
    filename: "css/style.[contenthash].css",
    chunkFilename: "[name].css"
})

module.exports = {
    css: css,
    js: js,
    HotModuleReplacementPlugin: HotModuleReplacementPlugin,
    MiniCssExtractPlugin: MiniCssExtractPlugin
};
