
import TYPE from './action.types.js';

export const setHotWord = params=>{
    return {
        type:TYPE.admin.SET_HOT_WORD,
        params
    }
}

//admin
export const setToggleSidebar = (isHideSidebar)=>{
    return {
        type:TYPE.admin.SET_TOGGLE_SIDEBAR,
        isHideSidebar
    }
}