import React from 'react';
import { render } from 'react-dom';
import {IndexLink, Link, browserHistory} from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../assets/css/common/header.css';
import ACT from '../../redux/actions';

//非方法
class Header extends React.Component {
    constructor (props) {
        super(props);
    }
    render(){
        let common = this.props.state.common;
        let dispatch = this.props.dispatch;
        return (
            <div className="header">
                <IndexLink to="/" activeClassName="active" className="logo color-green" >B<span className="color-black font-20">est</span></IndexLink>
                <div className="nav-list sm-hide">
                    <IndexLink to="/" activeClassName="active">首页</IndexLink>
                    <Link to="/search" activeClassName="active">搜索</Link>
                    <Link to="/about" activeClassName="active">关于</Link>
                    <Link to="/message" activeClassName="active">留言</Link>
                    <Link to={common.isLogin ? '/admin/home' : '/admin/signin'} activeClassName="active">{common.isLogin ? '管理' : '登录'}</Link>
                </div>
                <div className="menu-btn md-hide">
                    <a href="javascript:;" onClick={()=>dispatch(ACT.common.setToggleMenu())} className={common.iShowMenu ? 'icon-reorder on' : 'icon-reorder' }></a>
                </div>
            </div>
        )
    }
}



const mapStateProps = (state) => {
    return {
        state
    }
}
const mapDispatchProps = (dispatch) => {
    return {
       dispatch
    }
}

export default connect(
    mapStateProps,
    mapDispatchProps, null, {
  pure: false
}
)(Header);




