import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DTOplayerId } from './dtos/playerId.dto';

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async moldPlayer( 
        @Body() playerID: DTOplayerId
        ) {
        const newPlayerId = await this.playersService.moldPlayer(playerID);
        return JSON.stringify({ "success": newPlayerId })
    }

    @Get()
    async listPlayers(
        @Query('email') email: string
    ) {
        if (email) {
            return this.playersService.searchByEmail(email);
        } else {
            return this.playersService.listAll();
        }
    }

    @Delete()
    async deletePlayer(
        @Query('email') email: string
    ) {
        return this.playersService.deletePlayer(email);
    }
}
 