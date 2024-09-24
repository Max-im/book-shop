import { IsString, IsDate, IsNotEmpty, IsDefined, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeDto } from '@app/common';

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

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateChargeDto)
    charge: CreateChargeDto;
}
