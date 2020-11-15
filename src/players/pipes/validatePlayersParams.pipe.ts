import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class PipeValidatePlayersParams implements PipeTransform {

    transform(value: any, metadata: ArgumentMetadata) {
        
        if(!value) {
            throw new BadRequestException (`O valor de ${metadata.data} deve ser informado.`)
        };
        return value;

    };

}