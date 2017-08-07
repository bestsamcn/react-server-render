import React from 'react';
import BFooter from '../components/common/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ArticleList from '../components/article/ArticleList';
import ACT from '../redux/actions';
import $$ from '../utils';
import * as API from '../api';
import '../assets/css/home/index.css';


class Home extends React.Component {
    static getInitState(dispatch){
        return new Promise((resolve, reject)=>{
            API.getArticleList().then(res=>{
                dispatch(ACT.home.setArticleList(res.data));
                resolve(res.data);
            }, err=>{ reject(err)}).catch(e=>{console.log(e)})
        })
    }
    componentWillMount() {
        //就算通过常量判断平台，但是依然无法传入服务端的store进行初始化操作。所以想在服务端完成store初始化，只能使用静态方法在服务端初始化。
    }
    componentDidMount(){
        // __isServer__ && this.constructor.getInitState(this.props.dispatch);
    }
    render(){
        return (
            <div className="home">
                <div className="main">
                    <div className="wrapper">
                        <div className="left-cont">
                            <ArticleList onLoadMore={()=>{}} isShowMore={true} isMobile={false} isMore={false} articleList={this.props.articleList} />
                        </div>
                    </div>
                </div>
                <BFooter />
            </div>
        )
    }
}

const mapStateProps = state=>{
    return {
        state,
        articleList:state.home.articleList
    }
}

const mapDispatchProps = dispatch=>{
    return{
        dispatch,
        getArticleList:(params)=>dispatch(ACT.home.getArticleList(params))
        
    }
}

export default connect(mapStateProps, mapDispatchProps)(Home);
