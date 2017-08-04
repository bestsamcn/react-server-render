import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import routes from './router';
import configureStore from './store';


const initialState = window.__INITIAL_STATE__ || {list:{list:['item1', 'item2', 'item3']}, item:{item:'item1'}};
const store = configureStore(initialState);
const Root = (props) => {
  return (
      <Provider store={store}>
          {routes}
      </Provider>
  );
}

render(<Root />, document.getElementById('app'));