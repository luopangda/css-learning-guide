import React from 'react';
import styles from './LoginByDIY.css';

import {Modal} from 'antd';
import 'antd/dist/antd.css'
import classnames from 'classnames';
import {connect} from 'react-redux';

class LoginByDIY extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: true,
    };
  }

  render() {
    console.log(this);
    const open = this.props.open;
    const isLogin = this.state.toggle;
    const toggleClass = isLogin ? 'loginBg' : 'regBg';
    return (
      <Modal
        visible={open}
        onCancel={this.props.handleClose}
        footer={null}
        closable
      >
        <div className={styles.wechatLoginSec}>
          <div className={classnames(styles.imageSec, styles[toggleClass])}></div>
          <div className={styles.inputSec}>
            <iframe className={styles.nlogin_iframe}
                    frameBorder="0"
                    sandbox="allow-scripts allow-same-origin allow-top-navigation"
                    scrolling="no"
                    src="https://open.weixin.qq.com/connect/qrconnect?appid=wxbdc5610cc59c1631&redirect_uri=https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect"></iframe>
          </div>
        </div>
      </Modal>
    )
  }
}


export default connect()(LoginByDIY);
