// webpack.prod.conf.js 文件
const merge = require('webpack-merge'); //合并配置
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 插件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, {
    mode: 'production',  //mode是webpack4新增的模式
    plugins: [ // 新增 plugins
        // 自动生成HTML文件
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: '菜鸟想拿前端 offer - produced by kurryluo', //更改HTML的title的内容
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        // 清除dist打包的旧文件
        new CleanWebpackPlugin(['../dist'], { allowExternal: true}),
        // 分析哪些文件体积过大
        new BundleAnalyzerPlugin(),
    ],
});
