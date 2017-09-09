import React from 'react';
import {connect} from 'dva';
import styles from './Drag.css';
import WechatComponent from '../components/WechatLogin/index'
function Index() {
  return (
    <div className={styles.normal} style={{textAlign: 'center'}}>
      <WechatComponent/>
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Index);
