import { RootState } from '../store';

export const streamsStreamsSelector = (state: RootState) =>
    state.streams.streams;
