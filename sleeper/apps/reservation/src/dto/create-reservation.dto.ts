import { IsString, IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
    @Type(() => Date)
    @IsDate()
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    readonly endDate: Date;
    
    @IsString()
    @IsNotEmpty()
    readonly placeId: string;
    
    @IsString()
    @IsNotEmpty()
    readonly invoiceId: string;
}
