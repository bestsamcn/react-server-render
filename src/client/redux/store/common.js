import TYPE from '../actions/action.types';
let initState = {
	token:'',
    isLogin:false,
    isLoading:false,
    isMobile:false,
    msg:'',
    clientHeight:0,
    iShowMenu:false,
    hotWord:{
        isFromHotWord:false,
        name:''
    },
    hotWordList:[],
    articleParams:{category: "前端", tag: "", isFromHome: true}
}

const  common = (state=initState, action)=>{
    switch(action.type){
        case TYPE.common.SET_LOGIN:
            return Object.assign({}, state, {isLogin: action.isLogin});
        case TYPE.common.SET_TOKEN:
            return Object.assign({}, state, {token: action.token});
        case TYPE.common.SET_LOADING:
            return Object.assign({}, state, {isLoading: action.isLoading});
        case TYPE.common.SET_MOBILE:
            return Object.assign({}, state, {isMobile: action.isMobile});
        case TYPE.common.SET_TOAST:
            return Object.assign({}, state, {msg: action.msg});
        case TYPE.common.SET_CLIENT_HEIGHT:
            return Object.assign({}, state, {clientHeight: action.clientHeight});
        case TYPE.common.SET_TOGGLE_MENU:
            let _iShowMenu = !state.iShowMenu;
            return Object.assign({}, state, {iShowMenu: _iShowMenu});
        case TYPE.common.SET_ARTICLE_PARAMS:
            return Object.assign({}, state, {articleParams: action.articleParams});
        case TYPE.common.GET_HOT_WORD_LIST:
            return Object.assign({}, state, {hotWordList: action.hotWordList});
        case TYPE.common.SET_HOT_WORD:
            return Object.assign({}, state, {hotWord: action.params});
        default:
            return state
    }
}

export default common;