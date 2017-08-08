
import TYPE from './action.types.js';
import * as API from '../../api';
const { common } = TYPE; 


export const setLogin = isLogin=>{
    return {
        type:common.SET_LOGIN,
        isLogin
    }
}

export const setToken = token=>{
    return {
        type:common.SET_TOKEN,
        token
    }
}

export const delToken = ()=>{
    return {
        type:common.DEL_TOKEN
    }
}


export const setLoading = isLoading=>{
    return {
        type:common.SET_LOADING,
        isLoading
    }

}
export const setMobile = isMobile=>{
    return {
        type:common.SET_MOBILE,
        isMobile
    }
}

export const setClientHeight = clientHeight=>{
    return {
        type:common.SET_CLIENT_HEIGHT,
        clientHeight
    }
}

const closeToast = ()=>{
    return {
        type:common.SET_TOAST,
        msg:''
    }
}


export const setToast = msg=>{
    return[
        {
            type:common.SET_TOAST,
            msg
        },(dispatch, getState)=>{
            setTimeout(()=>{
                dispatch(closeToast())
            }, 2000)
        }
    ]
}

export const setToggleMenu = ()=>{
    return {
        type:common.SET_TOGGLE_MENU
    }
}

const setHotWordList = (hotWordList)=>{
    return {
        type:common.GET_HOT_WORD_LIST,
        hotWordList
    }
}

export const getHotWordList = ()=> (dispatch, getState)=>{
    API.getHotWordList().then(res=>{
        dispatch(setHotWordList(res.data));
    });
}