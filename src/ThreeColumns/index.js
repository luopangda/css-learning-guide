import React from "react";
import "./index.less"

export default class ThreeColumns extends React.Component{
    render(){
        return (
            <div>
                <div className="first">第一栏</div>
                <div className="second">第二栏</div>
                <div className="three">第三栏</div>
            </div>
        )
    }
}
