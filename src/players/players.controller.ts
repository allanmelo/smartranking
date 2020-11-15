import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlayersService } from './players.service';
import { DTOcreatePlayer } from './dtos/createPlayer.dto';
import { DTOupdatePlayer } from './dtos/updatePlayer.dto';
import { PipeValidatePlayersParams } from './pipes/validatePlayersParams.pipe';
import { IPlayer } from './interfaces/player.interface';

@Controller('/api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) {}

    @Get()
    async listAllPlayers() {
        return this.playersService.listAll();
    }
    
    @Get('/:_id')
    async listPlayerById(
        @Param('_id', PipeValidatePlayersParams) _id: string): Promise<IPlayer> {
        return this.playersService.searchById(_id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer( @Body() createPlayer: DTOcreatePlayer ) {
        const newPlayerId = await this.playersService.create(createPlayer);
        return JSON.stringify({ "success": newPlayerId })
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async updatePlayer( 
        @Body() registeredPlayer: DTOupdatePlayer,
        @Param('_id', PipeValidatePlayersParams)
        _id: string) {
        const updatedPlayerId = await this.playersService.update(_id, registeredPlayer);
        return JSON.stringify({ "success": updatedPlayerId })
    }

    @Delete('/:_id')
    async deletePlayer(
        @Param('_id', PipeValidatePlayersParams) _id: string
    ) {
        const deletedResponse = await this.playersService.delete(_id);

        return JSON.stringify({ "success": deletedResponse })
    }

}
 