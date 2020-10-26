import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DTOcreatePlayer } from './dtos/createPlayer.dto';
import { IPlayer } from './interfaces/player.interface';

@Injectable()
export class PlayersService {
    private readonly logger = new Logger(PlayersService.name);

    private players: IPlayer[] = [];

    async moldPlayer(createPlayer: DTOcreatePlayer): Promise<IPlayer> {
        const player = await this.create(createPlayer);
        return player;
    };

    async listPlayers(){
        return this.players;
    }

    private create(createPlayer: DTOcreatePlayer): IPlayer {
        const { name, email, phone } = createPlayer;
        const player: IPlayer = {
            _id: uuidv4(),
            email,
            name,
            phone,
            photoUrl: "https://images.unsplash.com/photo-1583275478661-1c31970669fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
            ranking: "A",
            rankingStats: 1
        };
        this.logger.log(`createPlayer: ${JSON.stringify(player)}`);
        this.players.push(player);
        return player;
    }

}
