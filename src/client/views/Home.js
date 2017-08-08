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
import Category from '../components/home/Category';
import Rank from '../components/home/Rank';
import Hot from '../components/home/Hot';
import Tag from '../components/home/Tag';


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
    static getInitState(dispatch){
        return new Promise((resolve, reject)=>{
            API.getArticleList().then(res=>{
                dispatch(ACT.home.setArticleList(res.data));
                resolve(res.data);
            }, err=>{ reject(err)}).catch(e=>{console.log(e)})
        });
    }
    getDiffArticle(){
        API.getDiffArticle({type:1}).then(res=>{
            this.setState({categoryArticleGroup:res.data});
        });
        API.getDiffArticle({type:2}).then(res=>{
            this.setState({tagArticleGroup:res.data});
        });
    }
    scrollBar(){
        if(this.props.isMobile) return;
        var _body = document.body;
        var el = this.refs.scrollBar;
        var _pNode = el.parentNode;

        // return
        el.slideBar = ()=>{
            //滚动的极限距离
            var h = parseInt(_pNode.offsetHeight) - parseInt(el.offsetHeight)-20;
            var mainOffsetTop = parseInt(_pNode.offseTop);
            var mainHeight = parseInt(_pNode.offsetHeight);
            var slideBarHeight =  parseInt(el.offsetHeight) - 40 ;
            var slideBarIntOffsetTop = 20;
            var slideFunc = function() {
                var scrollTop = parseInt(_body.scrollTop);
                var slideBarOffsetTop = parseInt(el.offsetTop);
                var slideBarTop  = parseInt(el.style.top) || 0;

                //如果侧边栏和主体只差小于侧边栏的原始offsetTop就不滚动
                if(parseInt(h) < slideBarIntOffsetTop){
                    return false;
                }
                // var aniDistant=Math.min( ( Math.max( ( -mainOffsetTop, ( scrollTop - slideBarOffsetTop + slideBarTop)))), (mainHeight - slideBarHeight ) );
                var aniDistant= Math.min(  scrollTop , (mainHeight - slideBarHeight ) );
                //
                if (aniDistant > h) {
                    aniDistant = h
                };
                if (parseInt(_body.scrollTop) > slideBarIntOffsetTop ) {
                    $$.moveStart(el, {'top':aniDistant});
                } else {
                    $$.moveStart(el, {'top':10});
                }
            }
            slideFunc();
            window.addEventListener('scroll', slideFunc);
            document.addEventListener('resize', slideFunc);
        }
        setTimeout(()=>{
            el.slideBar()
        }, 500)
    }
    goArticleClick(name, type){
        var obj = {
            category:'',
            tag:'',
            isFromHome:true
        }
        obj[type] = name;
        this.props.setArticleParams(obj)
        setTimeout(()=>{
            browserHistory.push('/article');
        });
    }
    componentWillMount() {
        console.log('server: '+__isServer__, 'client: '+__isClient__ , '平台')
        //如果是通过前端路由切换过来的就执行这个方法，因为服务端在前端切换路由的时候，不会执行static
        __isClient__ && this.constructor.getInitState(this.props.dispatch);
        // this.getArticleList(true);
        __isClient__ && this.getDiffArticle();
    }
    componentDidMount(){
        this.scrollBar();
    }
    componentWillReceiveProps(){

    }
 
    render(){
        return (
            <div className="home">
                <div className="main">
                    <div className="wrapper">
                        <div className="left-cont">
                            <ArticleList onLoadMore={()=>{}} isShowMore={true} isMobile={false} isMore={false} articleList={this.props.articleList} />
                        </div>
                        {!this.props.isMobile && <div className="right-bar sm-hide" ref="scrollBar">
                            <Category onCateClick={this.goArticleClick.bind(this)} categoryArticleGroup={this.state.categoryArticleGroup}>
                                <div className="title color-black">
                                    分类
                                </div>
                            </Category>
                            <Rank latestList={this.props.state.home.articleList.slice(0, 4)} />
                            <Tag tagArticleGroup={this.state.tagArticleGroup} onTagClick={this.goArticleClick.bind(this)}>
                                <div className="title color-black">
                                    标签
                                </div>
                            </Tag>
                        </div>}
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
        isMobile:false,
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
