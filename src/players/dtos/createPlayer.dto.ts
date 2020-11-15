import { IsEmail, IsNotEmpty } from 'class-validator';

export class DTOcreatePlayer {

    @IsNotEmpty()
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly name: string;

}