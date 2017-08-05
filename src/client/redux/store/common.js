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
	return state;
}

export default common;