import React from 'react';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import './assets/css/common/base.css';
import './assets/libs/Font-Awesome-3.2.1/css/font-awesome.min.css';
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
const Search = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./views/Search').default)
    },'Search')
}
const Message = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./views/Message').default)
    },'Message')
}
const About = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./views/About').default)
    },'About')
}

const Admin = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin').default)
    },'Admin')
}
const Signin = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./views/admin/Signin').default)
    },'Signin')
}
const router = (
    <div>
        <Router history={browserHistory}>
            <Route path="/" getComponent={App}>
                <IndexRoute getComponent={Home}/>
                <Route path="/search" getComponent={Search}/>
                <Route path="/message" getComponent={Message}/>
                <Route path="/About" getComponent={About}/>
                <Route path="/admin" title="管理" getComponent={Admin}>
                    <IndexRoute title="登录" getComponent={Signin} />
                    <Route path="signin" title="登录" getComponent={Signin} />
                </Route>
            </Route>
        </Router>
    </div>
)

export default router;