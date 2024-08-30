import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
    @Type(() => Date)
    @IsDate()
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    readonly endDate: Date;
    
    @IsString()
    readonly placeId: string;
    
    @IsString()
    readonly invoiceId: string;
}
