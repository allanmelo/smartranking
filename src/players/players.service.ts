import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

import { DTOcreatePlayer } from './dtos/createPlayer.dto';
import { DTOupdatePlayer } from './dtos/updatePlayer.dto';
import { IPlayer } from './interfaces/player.interface';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Players') private readonly playerModel: Model<IPlayer>){}
    
    private readonly logger = new Logger(PlayersService.name);

    async create(newPlayer: DTOcreatePlayer) {

        const { email } = newPlayer;

        const knownPlayer = await this.playerModel.findOne({email}).exec();

        if (knownPlayer) {
            throw new BadRequestException(`O email ${email} está associado a um jogador já cadastrado`)
        }
        
        const player = new this.playerModel(newPlayer);
        
        return await player.save();

    };

    async update(_id: string, registeredPlayer: DTOupdatePlayer) {

        const knownPlayer = await this.playerModel.findOne({_id}).exec();

        if (!knownPlayer) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`)
        }

        await this.playerModel.findOneAndUpdate( {_id}, {$set: registeredPlayer} ).exec();

        return await this.playerModel.findOne({_id}).exec();
    
    };

   async searchById(_id: string) {

        const knownPlayer = await this.playerModel.findOne({_id}); 

        if (!knownPlayer) {
            throw new NotFoundException (`Jogador com ${_id} não foi encontrado`)
        }
        return knownPlayer;

    }

    async listAll(){

        return await this.playerModel.find().exec();

    }

    async delete(_id: string) {

        const knownPlayer = await this.playerModel.findOne({_id});

        if (!knownPlayer) {
            throw new NotFoundException (`Jogador com ${_id} não foi encontrado`)
        }
        
        const deletedPlayer = await this.playerModel.deleteOne({_id}).exec();
        
        return `Player ${knownPlayer.name} was deleted.`

    }

}
