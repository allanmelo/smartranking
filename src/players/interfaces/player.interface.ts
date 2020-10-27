import { Document } from 'mongoose';

export interface IPlayer extends Document {
    readonly phone: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingStats: number;
    photoUrl: string;
}