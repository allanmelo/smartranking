import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DTOplayerId } from './dtos/playerId.dto';

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async moldPlayer( 
        @Body() playerID: DTOplayerId
        ) {
        const newPlayerId = await this.playersService.moldPlayer(playerID);
        return JSON.stringify({ "success": newPlayerId })
    }

    @Get()
    async listPlayers() {
        return this.playersService.listAll();
    }
}
 