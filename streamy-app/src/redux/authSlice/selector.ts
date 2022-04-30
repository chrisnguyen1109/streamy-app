import { RootState } from '../store';

export const authUserSelector = (state: RootState) => state.auth.user;
