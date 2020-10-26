import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DTOcreatePlayer } from './dtos/createPlayer.dto';

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async moldPlayer(
        @Body() createPlayer: DTOcreatePlayer
    ) {
        const newPlayer = await this.playersService.moldPlayer(createPlayer);
        return JSON.stringify({ "success": newPlayer })
    }

    @Get()
    async listPlayers() {
        return this.playersService.listPlayers();
    }
}
 