import React from 'react';
import {connect} from 'dva'
import LoginByDIY from './LoginByDIY/LoginByDIY'
import 'antd/dist/antd.css'
import styles from './index.css'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,//默认不打开登录窗口
    };
  }

  handleClose = () => {
    //关闭窗口
    this.setState({
      open: false
    });
  };


  componentWillMount() {

  }

  componentWillReceiveProps(props) {

  }

  render() {

    //控制登录框是否出现
    const isShowLogin = this.state.open ?
      <LoginByDIY open={this.state.open}
                  handleClose={this.handleClose}/>
      : '';

    return (
      <div className={styles.login}>
        <div>
          <h1>
            <a href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect'>直接跳转到微信提供的网页</a>
          </h1>
        </div>
        <div onClick={()=>{
          this.setState({
            open:true
          })
        }}>
          <h1>
            <a style={{color:'#000000'}}>
              点击弹出登录模态框
            </a>
          </h1>
        </div>
        {isShowLogin}
      </div>
    );
  }
}


function mapStateToProps(state) {

  return {

  };
}

export default connect(mapStateToProps)(Header);
