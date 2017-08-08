import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import routes from './router';
import configureStore from './redux';
import ACT from './redux/actions';
import $$ from './utils';
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
store.dispatch(ACT.common.setMobile($$.isMobile()));
//全局数据初始化
store.dispatch(ACT.common.setToken(localStorage['__bestToken__'] && JSON.parse(localStorage['__bestToken__'])));
store.dispatch(ACT.common.setLogin(localStorage['__bestLogin__'] && JSON.parse(localStorage['__bestLogin__'])));
store.dispatch(ACT.common.getHotWordList());
store.dispatch(ACT.common.setClientHeight(document.documentElement.clientHeight));


render(
	<Provider store={store}>
          {routes}
    </Provider>, 
    document.getElementById('app')
);
