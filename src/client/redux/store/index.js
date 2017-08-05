import { combineReducers } from 'redux';
import home from './home';
import common from './common';
let rootReducer = combineReducers({
	common,
	home
});

export default rootReducer;