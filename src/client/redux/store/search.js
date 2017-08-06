import * as CONFIG from '../../config';
import TYPE from '../actions/action.types';
let initState = {
	pageIndex:1,
	pageSize:CONFIG.PAGE_SIZE,
	articleList:[],
	isMore:true,
    keyword:'',
    isCache:false
}

const search = (state=initState, action)=>{
	switch(action.type){
		case TYPE.search.SET_ARTICLE_LIST:
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
}

export default search;