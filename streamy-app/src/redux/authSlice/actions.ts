import { ActionCreator } from 'types';
import { AuthType, AuthLogin, AuthLogout } from './types';

export const logIn: ActionCreator<AuthLogin> = payload => ({
    type: AuthType.LOG_IN,
    payload: payload,
});

export const logOut: ActionCreator<AuthLogout> = () => ({
    type: AuthType.LOG_OUT,
    payload: undefined,
});
