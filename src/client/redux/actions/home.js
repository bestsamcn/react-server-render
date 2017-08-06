import * as API from '../../api';
import TYPE from './action.types';


export const setArticleList = (payload)=>{
	return {
		type:TYPE.home.SET_ARTICLE_LIST,
		payload
	}
}
export const getArticleList = (params)=>(dispatch)=>{
	API.getArticleList(params).then(res=>{
		dispatch({type:'SET_ARTICLE_LIST',payload:res.data})
	});
}