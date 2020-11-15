import { IsNotEmpty } from 'class-validator';

export class DTOupdatePlayer {

    @IsNotEmpty()
    readonly phone: string;

    @IsNotEmpty()
    readonly name: string;

}