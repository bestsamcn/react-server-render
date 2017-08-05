import {
    combineReducers,
    createStore,
    applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import {createLogger} from 'redux-logger';
import rootReducer from './store/index';
// store负责管理所有reducer，module.hot.accept表示支持热更新
const logger = createLogger({
    collapsed: true
});
let createStoreWithMiddleware = applyMiddleware(
    sequenceAction,
    thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require('./store/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}