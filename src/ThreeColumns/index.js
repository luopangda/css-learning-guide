import React from "react";
import "./index.less"

export default class ThreeColumns extends React.Component{
    render(){
        return (
            <div>
                <article className="parent">
                    <div className="center">
                        <div className="inner">圣杯布局</div>
                    </div>
                    <div className="left">左边</div>
                    <div className="right">右边</div>
                </article>
            </div>
        )
    }
}
