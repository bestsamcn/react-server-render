import React from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    }
}
const App = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./App').default)
    },'App')
}
const List = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/List').default)
    },'List')
}
const Item = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Item').default)
    },'Item')
}
// import App from './app';
// import List from './components/List';
// import Item from './components/Item';

const router = (
    <div>
        <Router history={browserHistory}>
            <Route path="/" getComponent={App}>
            	<IndexRoute getComponent={List}/>
            	<Route path="item" getComponent={Item}/>
            </Route>
        </Router>
    </div>
)

export default router;