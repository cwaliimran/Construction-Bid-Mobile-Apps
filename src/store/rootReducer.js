import {combineReducers} from 'redux';
import userReducer from './slices/user';
import bidReducer from './slices/bid';
import fileReducer from './slices/file';

const rootReducer = combineReducers({
  auth: userReducer,
  bid: bidReducer,
  file: fileReducer,
});

export {rootReducer};
