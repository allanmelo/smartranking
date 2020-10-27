import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

import { DTOplayerId } from './dtos/playerId.dto';
import { IPlayer } from './interfaces/player.interface';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Players') private readonly playerModel: Model<IPlayer>){}
    
    private readonly logger = new Logger(PlayersService.name);

    // private players: IPlayer[] = [];

    async moldPlayer(playerID: DTOplayerId) {

        const { email } = playerID;

        // const knownPlayer = this.players.find( player => player.email === email );
        const knownPlayer = await this.playerModel.findOne({email}).exec();

        if (!!knownPlayer) {
            return this.update(playerID);
        } else {
            return this.create(playerID);
        }
    };

   async searchByEmail(email: string) {

        // const knownPlayer = this.players.find( player => player.email === email );
        const knownPlayer = await this.playerModel.findOne({email}); 

        if (!knownPlayer) {
            throw new NotFoundException (`Jogador não encontrado`)
        }
        return knownPlayer;
    }

    async listAll(){
        return await this.playerModel.find().exec();
        // return this.players;
    }

    async deletePlayer(email: string) {

        const deletedPlayer = await this.playerModel.findOneAndDelete({email}).exec();

        /* const knownPlayer = this.players.find( player => player.email === email );
        const knownPlayer = await this.playerModel.findOne({email}); 

        if (!knownPlayer) {
            throw new NotFoundException (`Jogador não encontrado`)
        }
        
        this.players = this.players.filter(player => player !== knownPlayer); */

        return `Player ${deletedPlayer.name} was deleted.`;
    }

    private async create(newPlayer: DTOplayerId) {

        const player = new this.playerModel(newPlayer);
        return await player.save();


        /* const { name, email, phone } = newPlayer;
        const player: IPlayer = {
            _id: uuidv4(),
            email,
            name,
            phone,
            photoUrl: "https://images.unsplash.com/photo-1583275478661-1c31970669fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
            ranking: "A",
            rankingStats: 1
        };
        this.logger.log(`newPlayer: ${JSON.stringify(player)}`);
        this.players.push(player); 
        return player; */
    }

    private async update(newPlayerInfo: DTOplayerId) {

        const { email } = newPlayerInfo;

        const oldInfo = await this.playerModel.findOneAndUpdate(
            {email}, {$set: newPlayerInfo}
            ).exec();

        const newInfo = await this.playerModel.findOne({email}).exec();
        
        if (newInfo !== oldInfo) {
            return newInfo
        } else {
            throw new Error('Try again')
        }        

        /* const { name } = newPlayerInfo;
        knownPlayer.name = name;
        return knownPlayer; */
    }

}
