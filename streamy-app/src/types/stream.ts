import { HasId } from './common';

export interface Stream extends HasId {
    title: string;
    descriptions: string;
    userId: string;
    userName: string;
    createdAt: Date | string;
}
