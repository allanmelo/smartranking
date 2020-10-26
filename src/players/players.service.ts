import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DTOplayerId } from './dtos/playerId.dto';
import { IPlayer } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    private readonly logger = new Logger(PlayersService.name);

    private players: IPlayer[] = [];

    moldPlayer(playerID: DTOplayerId): IPlayer {
        const { email } = playerID;

        const knownPlayer = this.players.find( player => player.email === email );

        if (knownPlayer) {
            return this.update(knownPlayer, playerID);
        } else {
            return this.create(playerID);
        }
    };

    listAll(){
        return this.players;
    }

    private create(newPlayer: DTOplayerId): IPlayer {
        const { name, email, phone } = newPlayer;
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
        return player;
    }

    private update(knownPlayer: IPlayer, newPlayerInfo: DTOplayerId) {
        const { name } = newPlayerInfo;
        knownPlayer.name = name;
        return knownPlayer;
    }

}
