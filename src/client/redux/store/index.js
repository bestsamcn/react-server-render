import { combineReducers } from 'redux';
import common from './common';
import home from './home';
import search from './search';

let rootReducer = combineReducers({
	common,
	home,
	search
});

export default rootReducer;