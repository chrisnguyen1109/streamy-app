import { Reducer } from 'redux';
import { AuthAction, AuthState, AuthType } from './types';

const initialState: AuthState = {
    user: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case AuthType.LOG_IN: {
            return { ...state, user: action.payload };
        }
        case AuthType.LOG_OUT: {
            return { ...state, user: null };
        }
        default:
            return state;
    }
};

export default authReducer;
