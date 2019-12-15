# 2019-11-12
新建一个项目，基于 webpack4+react+antd+redux

自己的脚手架工具

## 初始化

npm init 一步步地生成package.json文件，在package.json文件的scripts属性中添加build命令。

包含以下信息：

```json

{
  "name": "test",
  "version": "1.0.0",
  "description": "By \r [KurryLuo](http://www.kurryluo.com)",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config build/webpack.prod.conf.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [
    "tensor"
  ],
  "author": "kurryluo",
  "license": "MIT"
}
```

## 安装并配置webpack

> webpack 是一个 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

### 安装
npm install --save-dev webpack  webpack-cli

--save-dev是将依赖安装到开发环境中，即在package.json中的devDependencies目录下。--save是安装到生产环境中也就是在package.json中的dependencies目录下。

此时会看到一个文件夹，叫做node_modules，装的是各种依赖包。各种包的作用，请看本人做的github项目：[前端有包]()，简单说明了各种前端包的作用。

本人建立时的webpage版本：

```text
+ webpack@4.41.2
+ webpack-cli@3.3.10
```

###配置webpack
根目录下建立build文件夹， 新建三个js文件，分别命名为：webpack.base.conf（公共配置）、webpack.dev.conf（开发配置）、webpack.prod.conf（生产配置）。


webpack.base.conf（公共配置）:
```js
// webpack.base.conf.js 文件
const path = require('path'); //node.js自带的路径参数
const DIST_PATH = path.resolve(__dirname, '../dist'); //生产目录
const APP_PATH = path.resolve(__dirname, '../src'); //源文件目录

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        filename: 'js/[name].[hash].js', //使用hash进行标记
        path: DIST_PATH
    },
};
```
webpack.dev.conf（开发配置）:
```js
// webpack.prod.conf.js 文件
const merge = require('webpack-merge'); //合并配置
const baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig, {
    mode: 'production',  //mode是webpack4新增的模式
});
```

webpack.prod.conf（生产配置）:

```js
// webpack.prod.conf.js 文件
const merge = require('webpack-merge'); //合并配置
const baseWebpackConfig = require('./webpack.base.conf');
module.exports = merge(baseWebpackConfig, {
    mode: 'production',  //mode是webpack4新增的模式
});
```


三个文件通过3个webpack-merge来进行合并

安装 webpack-merge：

npm install --save-dev webpack-merge

本人使用版本：

```text
+ webpack-merge@4.2.2
```

### 创建src文件，存放index.js；创建public文件，存放index.html

index.js 文件：

```js
const element =document.getElementById('root');
element.innerHTML = 'hello, world!';
```

index.html 文件：

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>菜鸟想拿前端 offer - produced by kurryluo</title>
</head>
<body>
<body>
    <div id="root"></div>
    <script src="../dist/js/bundle.js"></script>
</body>
</body>
</html>
```

在package.json文件 scripts属性添加一个build命令

```json
// package.json
"scripts": {
    "build": "webpack --config build/webpack.prod.conf.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

## 安装 React

npm install react react-dom -S

对index.js文件进行编辑

```js
import React from "react";
import ReactDom from "react-dom";

ReactDom.render(
    <h1>hello, world!</h1>,
    document.getElementById("root")
);
```

## 安装babel，将ES6语法转换为ES5，以及起到js和css按需加载的作用（后面会解释）

为了避免版本问题，建议复制以下代码到package.json中，直接进行npm install
```json
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.0.2",
    "babel-plugin-import": "^1.9.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-merge": "^4.2.2"
  },
```

创建.babelrc文件，配置presets

```json
{
  "presets": [
	 "env",
    "react"
  ]
}
```

修改webpack.base.conf.js文件，添加module属性

```js
// webpack.base.conf.js
const path = require('path');
const APP_PATH = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
module.exports = {
    entry: {
        app: './app/index.js'
    },    
    output: {
        filename: 'js/bundle.js',
        path: DIST_PATH
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                use: "babel-loader",
                include: APP_PATH
            }
        ]
    }
};
```

运行npm run build，观察报错信息。如果按照上面的步骤进行安装，理应不会报错。

注意：感受错误也是编程必不可少的一环，因为谁也不可能一下子写出完全正确的代码。

如果构建成功，会出现一个dist文件，里面是打包好的js文件。这也就是webpack的作用，将一些js文件、react文件、图片、样式打包，这些包之间按照某种依赖联系。

控制台会提示：

```text
webpack --config build/webpack.prod.conf.js

Hash: 312e49a5d9b2de29b485
Version: webpack 4.41.2
Time: 2741ms
Built at: 2019-11-25 15:36:59
                         Asset     Size  Chunks                         Chunk Names
js/app.312e49a5d9b2de29b485.js  128 KiB       0  [emitted] [immutable]  app
Entrypoint app = js/app.312e49a5d9b2de29b485.js
[2] ./src/index.js 416 bytes {0} [built]
    + 7 hidden modules

```

## 安装webpack插件 HtmlWebpackPlugin。

作用：自动生成HTML文件
命令：
npm install --save-dev html-webpack-plugin

安装版本：

```text
+ html-webpack-plugin@3.2.0
```

修改public中的index.html文件如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>
<body>
<!--空的-->
</body>
</html>
```

紧接着添加 webpack.prod.conf.js中配置plugins属性

```json
// webpack.prod.conf.js 文件
const merge = require('webpack-merge'); //合并配置
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = merge(baseWebpackConfig, {
    mode: 'production',  //mode是webpack4新增的模式
    plugins: [ // 新增 plugins
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            title: '菜鸟想拿前端 offer - produced by kurryluo', //更改HTML的title的内容
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
    ],
});

```


再修改一下src文件夹中的index.js文件，在增加id为root的标签。

```js

import React from "react";
import ReactDom from "react-dom";

// 原生代码开始
const Div = document.createElement("div");
Div.setAttribute("id", "root");
document.body.appendChild(Div);
// 原生代码结束

ReactDom.render(
    <h1>hello, world!</h1>,
    document.getElementById("root")
);


```

现在用npm run build 重新构建一下

可以看到dist文件内自动生成了index.html文件，这个文件在部署的时候非常关键，一般配置 nginx 文件就是指向这个文件。

控制台出现：

```text

webpack --config build/webpack.prod.conf.js

Hash: 89bb306c13fa4dee0d64
Version: webpack 4.41.2
Time: 2950ms
Built at: 2019-11-25 15:59:29
                         Asset       Size  Chunks                         Chunk Names
                    index.html  334 bytes          [emitted]
js/app.89bb306c13fa4dee0d64.js    128 KiB       0  [emitted] [immutable]  app
Entrypoint app = js/app.89bb306c13fa4dee0d64.js
[2] ./src/index.js 566 bytes {0} [built]
    + 7 hidden modules
Child html-webpack-plugin for "index.html":
     1 asset
    Entrypoint undefined = index.html
    [0] ./node_modules/html-webpack-plugin/lib/loader.js!./public/index.html 611 bytes {0} [built]
    [2] (webpack)/buildin/global.js 472 bytes {0} [built]
    [3] (webpack)/buildin/module.js 497 bytes {0} [built]
        + 1 hidden module
```

可以直接在浏览器中打开index.html文件，页面显示 hello, world!，即为成功。


# 2019-11-25

## 优化webpack

- 生成的文件名添加Hash值

在webpack.base.conf.js文件中，修改filename属性，如下：

```json
output: {
    filename: "js/[name].[chunkhash].js",
},
```
- 插件 clean-webpack-plugin：清理dist文件夹

命令：npm install --save-dev clean-webpack-plugin

版本：
```text
+ clean-webpack-plugin@3.0.0
```

安装完毕以后，修改 webpack.prod.conf.js，添加插件

- 添加热加载模块：每次修改完代码都要control  + s 再点预览？不用不用，热加载帮你。

命令：npm install --save-dev webpack-dev-server

在build 文件夹的webpack.dev.conf.js文件中添加：

```js
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
```


在package.json scripts属性添加以下 dev 命令，然后长这样了：

```json
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "build": "webpack --config build/webpack.prod.conf.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

接着可以启动开发环境，看一下效果：

用chrome浏览器打开网址——http:localhost:3000

修改一下src的index.js内容，比如在hello world后面加上 “哈哈”，你会看到浏览器自动更新。


## 添加loader 处理 css、less、sass文件

安装依赖：

npm install --save extract-text-webpack-plugin

版本：
```text
+ extract-text-webpack-plugin@3.0.2
```

npm install --save-dev style-loader css-loader postcss-loader autoprefixer 

npm install --save-dev less sass less-loader sass-loader stylus-loader node-sass 

版本：
```text
+ autoprefixer@9.7.2
+ postcss-loader@3.0.0
+ style-loader@1.0.0
+ css-loader@3.2.0
+ sass-loader@8.0.0
+ less@3.10.3
+ stylus-loader@3.0.2
+ less-loader@5.0.0
+ sass@1.23.7
+ node-sass@4.13.0
```

修改build文件夹中的webpack.base.conf.js 文件

在rules中，加入规则：

```json
            {
                test: /\.css$/,
                use: ['style-loader',
                    'css-loader',],
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
                    {  loader: "less-loader" }
                ]
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
```

## 添加loader，对图片和字体进行编译

安装依赖：
npm install --save-dev file-loader url-loader 

版本：

```text
+ file-loader@4.3.0
+ url-loader@2.3.0
```

在rules中，加入规则：

```json
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
```


然后可以在index.js引入一个图片, 还有css文件进行编译试试看。

修改index.js文件，如下：

```js

import React from "react";
import ReactDom from "react-dom";
import "./index.less";
// 加载图片
const image = require('./image.jpg');
// 原生代码开始
const Div = document.createElement("div");
Div.setAttribute("id", "root");
document.body.appendChild(Div);
// 原生代码结束

ReactDom.render(
    <div>
        <h1>hello, world ! 哈哈 </h1>
        <img src={image} className="image"/>
    </div>,
    document.getElementById("root")
);

```

## webpack-bundle-analyzer 插件，代码分析工具：对生成的代码进行分析

安装依赖：

npm install --save-dev webpack-bundle-analyzer

版本：

```text
+ webpack-bundle-analyzer@3.6.0
```

修改webpack.prod.conf.js文件，变成如下：

```js
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

```

# 2019-11-26 引入 antd 设计语言

安装依赖：

npm install --save antd

版本：

```text
+ antd@3.25.3
```

修改index.js，引入 antd 的按钮组件。你会发现样式并没有被加载

官方给出两种方案：

- 一种是在index.css,在文件顶部引入 antd/dist/antd.css。
这种方式将所有的antd样式都囊括进来，压缩以后（gzipped 后）一共大约 60kb。不优雅，没腔调。

  修改index.less文件如下：
  ```less
  @import '~antd/dist/antd.css';
  .image{
    height: 200px;
    width: 200px;
  }
  ```
- 一种是使用 babel-plugin-import，官网下面还有一行小字：
antd 默认支持基于 ES module 的 tree shaking，js 代码部分不使用这个插件也会有按需加载的效果。
正是因为这行小字，让我明白前面学习的基础知识、背的那些知识点是连贯的。那行小字是性能优化的内容，按需加载的最终目的还是减少包的大小，能够起到节约带宽资源的作用。

babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件。注意：这不是webpack的插件，而是babel的插件。

安装插件（前面已经安装过了，就不用再安装）：

npm install --save-dev babel-plugin-import

修改一下.babelrc文件

```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": true
      }
    ]
  ]
}
```

此时不用第一种引入方式，将index.less文件修改为：

```less
.image{
  height: 200px;
  width: 200px;
}
```

运行以后，你会发现，莫名其妙的错误又来了，不要慌，一切都在掌握中。

修改一下 .babelrc 中的 style 属性为"css"，如下：

```json

{
  "presets": [
    "env",
    "react"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "lib",
        "style": "css"
      }
    ]
  ]
}
```

现在重新运行项目，就会看到antd的样式已经被加载出来了。目前为止，脚手架工具已经完成得差不多了。

写一些简单的单页面应用足够了，但是想要构建更复杂的应用，需要用到react全家桶，构建可视化图形，还需要引入各类可视化组件。

那么现在我们先来试一下安装 redux 。

## 安装 Redux

Redux 是数据管理中一个工具而已，没有什么稀奇的，react 通过父子组件传值，一些新的特性比如context，Hooks api，也可以做到数据的传值。

除此之外，还有各种方式，比如event bus、各种数据流管理库，比如mobx，作用都是一样的，都是为了更好地管理数据，让多个页面能够互相通信，共享数据。

![](https://img-blog.csdnimg.cn/20190529151847690.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NhcmVfeW91cnNlbGY=,size_16,color_FFFFFF,t_70)

redux 有官方文档可以查看，记住上面四者的关系，问题不大。

安装依赖：

npm install --save-dev redux react-redux

版本：

```text
+ react-redux@7.1.3
+ redux@4.0.4
```
安装好以后，就需要用代码说话，构建上面提到的四要素，先上一副文件结构图：

![](https://img-blog.csdn.net/20180411163604850)

对，文件结构非常复杂，但是拨云驱雾，我们可以看到就几样东西：actions、store、reducer、components，对应的就是上面四要素。

至于constants（常量）、middleware（中间件）、container（组件的容器，无大用），基本上不用关心。

按照结构新建一下新建文件夹和文件，修改一下index.js文件如下：







