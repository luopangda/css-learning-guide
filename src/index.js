import React from "react";
import ReactDom from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./index.less";
import AlignCenter from "./AlignCenter"
import Bfc from "./BFC"
import OneColumn from "./OneColumn"
import TwoColumns from "./TwoColumns"
import ThreeColumns from "./ThreeColumns"

// 加载图片
const image = require('./image.jpg');
// 原生代码开始
const Div = document.createElement("div");
Div.setAttribute("id", "root");
document.body.appendChild(Div);
// 原生代码结束



class App extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/align-center">
                            <AlignCenter />
                        </Route>
                        <Route path="/bfc">
                            <Bfc />
                        </Route>
                        <Route path="/one-column">
                            <OneColumn />
                        </Route>
                        <Route path="/two-columns">
                            <TwoColumns />
                        </Route>
                        <Route path="/three-columns">
                            <ThreeColumns />
                        </Route>

                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDom.render( <App/>,
    document.getElementById("root")
);
