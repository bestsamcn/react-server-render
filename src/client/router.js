import React from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import App from './app';
import List from './components/List';
import Item from './components/Item';

const router = (
    <div>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            	<IndexRoute component={List}/>
            	<Route path="item" component={Item}/>
            </Route>
        </Router>
    </div>
)

export default router;