import { User } from 'types';

export interface AuthState {
    user: User | null;
}

export enum AuthType {
    LOG_IN = 'LOG_IN',
    LOG_OUT = 'LOG_OUT',
}

export interface AuthLogin {
    type: AuthType.LOG_IN;
    payload: User;
}

export interface AuthLogout {
    type: AuthType.LOG_OUT;
    payload: undefined;
}

export type AuthAction = AuthLogin | AuthLogout;
