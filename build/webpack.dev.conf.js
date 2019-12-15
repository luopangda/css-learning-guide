const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    output: {
        filename: "js/[name].[hash:16].js",
    },
    // 源错误检查
    devtool: 'inline-source-map',
    plugins: [
        // 处理html
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            title: '菜鸟想拿前端 offer - produced by kurryluo', //更改HTML的title的内容
            minify: {
                html5: true
            },
            hash: false
        }),
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
    ],
    // 热更新
    devServer: {
        port: '3000',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        historyApiFallback: true,
        hot: true, //开启
        https: false,
        noInfo: true,
        open: true,
        proxy: {}
    }
});
