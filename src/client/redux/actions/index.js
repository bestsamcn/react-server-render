import * as API from '../../api';


export const setArticleList = (payload)=>{
	return {
		type:'SET_ARTICLE_LIST',
		payload
	}
}
export const getArticleList = (params)=>(dispatch)=>{
	API.getArticleList(params).then(res=>{
		dispatch({type:'GET_ARTICLE_LIST',payload:res.data})
	});
}