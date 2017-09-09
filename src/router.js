import React from 'react';

import { Router } from 'dva/router';
const cached = {};

function registerModel(app, model) {
  console.log(app);
  if (!cached[model.namespace]) {
    app.model(model);

    cached[model.namespace] = 1;
  }
}
function RouterConfig({ history, app }) {
  const routes = [
    //微信登录
    {
      path: '/Login',
      name: '/Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login'));
          cb(null, require('./routes/Login'));
        });
      },
    },
    {
      path: '/drag',
      name: '/drag',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/drag'));
          cb(null, require('./routes/Drag'));
        });
      },
    },
    // 后台管理
  ];

  return <Router history={history} routes={routes} />;
}
export default RouterConfig;
