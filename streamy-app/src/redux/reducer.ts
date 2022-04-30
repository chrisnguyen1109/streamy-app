import { combineReducers } from 'redux';
import authReducer from './authSlice/reducer';
import streamsReducer from './streamsSlice/reducer';

const reducer = combineReducers({
    auth: authReducer,
    streams: streamsReducer,
});

export default reducer;
