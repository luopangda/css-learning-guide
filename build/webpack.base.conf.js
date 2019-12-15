// webpack.base.conf.js 文件
const path = require('path'); //node.js自带的路径参数
const DIST_PATH = path.resolve(__dirname, '../dist'); //生产目录
const APP_PATH = path.resolve(__dirname, '../src'); //源文件目录

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'js/[name].[chunkhash].js', //使用hash进行标记
        path: DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                include: APP_PATH
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader',],
            },
            {
                test:/\.less$/,
                use: [
                    {  loader: "style-loader"  },
                    {  loader: "css-loader" },
                    {
                        loader: "postcss-loader",//自动加前缀
                        options: {
                            plugins:[
                                require('autoprefixer')({
                                    browsers:['last 5 version']
                                })
                            ]
                        }
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                    },
                    { loader: "sass-loader" },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['last 5 version']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // outputPath:'../',//输出**文件夹
                        publicPath: '/',
                        name: "images/[name].[ext]",
                        limit: 1000  //是把小于1000B的文件打成Base64的格式，写入JS
                    }
                }]
            },
            {
                test: /\.(woff|svg|eot|woff2|tff)$/,
                use: 'url-loader',
                exclude: /node_modules/
                // exclude忽略/node_modules/的文件夹
            }
        ]
    },
};
