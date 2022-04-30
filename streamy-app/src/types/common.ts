export interface ReduxAction {
    type: string;
    payload?: any;
}

export type ActionCreator<T extends ReduxAction> =
    T['payload'] extends undefined ? () => T : (payload: T['payload']) => T;

// replace by Type Reducer
export type ActionReducer<T extends any, K extends ReduxAction> = (
    state: T,
    action: K
) => T;

export interface FetchOptions {
    url: string;
    config?: RequestInit;
}

export type HasId = {
    id: number;
};
