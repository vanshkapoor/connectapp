import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import postReducer from './postReducer';

export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    profile:profileReducer,
    post:postReducer
});


