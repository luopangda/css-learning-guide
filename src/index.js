import React from "react";
import ReactDom from "react-dom";
import {render} from "react-dom";
import {Provider} from "react-redux";
import { Button, Switch } from 'antd';
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
        <Button type="primary">Primary</Button>
        <Switch defaultChecked />
    </div>,
    document.getElementById("root")
);
