import { createStore, combineReducers} from 'redux';
import list from './listState';
import item from './itemState';
let rootReducer = combineReducers({list, item});

// Apply middleware here
// ...

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);
  console.log(store.getState())
  return store;
}