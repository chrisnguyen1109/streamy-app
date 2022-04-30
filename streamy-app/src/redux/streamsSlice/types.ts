import { Stream } from 'types';

export interface StreamsState {
    streams: {
        [key: string]: Stream;
    };
}

export enum StreamsType {
    FETCH_STREAM = 'FETCH_STREAM',
    ADD_STREAM = 'ADD_STREAM',
    UPDATE_STREAM = 'UPDATE_STREAM',
    REMOVE_STREAM = 'REMOVE_STREAM',
}

export interface StreamsFetch {
    type: StreamsType.FETCH_STREAM;
    payload: Stream[];
}

export interface StreamsAdd {
    type: StreamsType.ADD_STREAM;
    payload: Stream;
}

export interface StreamsUpdate {
    type: StreamsType.UPDATE_STREAM;
    payload: Stream;
}

export interface StreamsRemove {
    type: StreamsType.REMOVE_STREAM;
    payload: number;
}

export type StreamsAction =
    | StreamsAdd
    | StreamsUpdate
    | StreamsRemove
    | StreamsFetch;
