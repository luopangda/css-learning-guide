import React from "react";
import "./index.less"
export default class OneColumn extends React.Component{
    render(){
        return (
            <div>
                <div className="header">头</div>
                <div className="content">内容</div>
                <div className="footer">尾</div>
            </div>
        )
    }
}
