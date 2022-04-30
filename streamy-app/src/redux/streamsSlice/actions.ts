import { ActionCreator } from 'types';
import {
    StreamsType,
    StreamsAdd,
    StreamsUpdate,
    StreamsRemove,
    StreamsFetch,
} from './types';

export const fetchStream: ActionCreator<StreamsFetch> = payload => ({
    type: StreamsType.FETCH_STREAM,
    payload,
});

export const addStream: ActionCreator<StreamsAdd> = payload => ({
    type: StreamsType.ADD_STREAM,
    payload,
});

export const updateStream: ActionCreator<StreamsUpdate> = payload => ({
    type: StreamsType.UPDATE_STREAM,
    payload,
});

export const removeStream: ActionCreator<StreamsRemove> = payload => ({
    type: StreamsType.REMOVE_STREAM,
    payload,
});
