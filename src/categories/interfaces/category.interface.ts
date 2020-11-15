import { Document } from 'mongoose';
import { IPlayer } from '../../players/interfaces/player.interface'; 

export interface Category extends Document {
    
    readonly categoria: string;
    description: string;
    events: Array<IEvent>;
    players: Array<IPlayer>;

}

export interface IEvent {

    name: string;
    operation: string;
    value: number;

}