import React from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import './assets/css/common/base.css';
import './assets/libs/Font-Awesome-3.2.1/css/font-awesome.min.css';
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
const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./views/Home').default)
    },'Home')
}
const router = (
    <div>
        <Router history={browserHistory}>
            <Route path="/" getComponent={App}>
                <IndexRoute getComponent={Home}/>
            </Route>
        </Router>
    </div>
)

export default router;