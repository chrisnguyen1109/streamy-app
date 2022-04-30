import { Reducer } from 'redux';
import { groupByKey, omit } from 'utils';
import { StreamsAction, StreamsState, StreamsType } from './types';

const initialState: StreamsState = {
    streams: {},
};

const streamsReducer: Reducer<StreamsState, StreamsAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case StreamsType.FETCH_STREAM: {
            return { streams: groupByKey(action.payload, 'id') };
        }
        case StreamsType.ADD_STREAM: {
            return {
                streams: {
                    ...state.streams,
                    [action.payload.id]: action.payload,
                },
            };
        }
        case StreamsType.UPDATE_STREAM: {
            return {
                streams: {
                    ...state.streams,
                    [action.payload.id]: action.payload,
                },
            };
        }
        case StreamsType.REMOVE_STREAM: {
            return {
                streams: omit(state.streams, [action.payload.toString()]),
            };
        }
        default:
            return state;
    }
};

export default streamsReducer;
