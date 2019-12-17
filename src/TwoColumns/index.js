import React from "react";
import "./index.less"
export default class TwoColumns extends React.Component{
    render(){
        return (
            <div className="parent">
                <div className="first">第一栏 任意增加字符串，内容自适应</div>
                <div className="second">第二栏</div>
            </div>
        )
    }
}
