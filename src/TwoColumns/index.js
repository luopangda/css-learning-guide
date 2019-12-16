import React from "react";
import "./index.less"
export default class TwoColumns extends React.Component{
    render(){
        return (
            <div>
                <div className="first">第一栏</div>
                <div className="second">第二栏</div>
            </div>
        )
    }
}
