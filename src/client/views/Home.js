import React from 'react';
import BFooter from '../components/common/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import ArticleList from '../components/article/ArticleList';
import * as ACT from '../redux/actions';
import * as API from '../api';
import '../assets/css/home/index.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList:[],
            pageIndex:1,
            pageSize:5,
            isMore:true,
            categoryArticleGroup:[],
            tagArticleGroup:[]
        }
    }
    componentWillMount() {
        var that = this;
        if(__isServer__){
            API.getArticleList().then(res=>{
                // that.setState({articleList:res.data})
            });
        }
    }
    componentDidMount(){
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
        articleList:state.home.articleList
    }
}

const mapDispatchProps = dispatch=>{
    return{
        getArticleList:(params)=>dispatch(ACT.getArticleList(params))
    }
}

export default connect(mapStateProps, mapDispatchProps)(Home);
