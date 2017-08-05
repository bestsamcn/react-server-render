import * as CONFIG from '../../config';
let initState = {
	articleList:[],
	pageSize:CONFIG.PAGE_SIZE,
	isMore:true,
    categoryArticleGroup:[],
    tagArticleGroup:[]
}

const home = (state=initState, action)=>{
	switch(action.type){
		case 'SET_ARTICLE_LIST':
			return Object.assign({}, state, {articleList:action.payload});
		default:
			return state;
	}
}

export default home;