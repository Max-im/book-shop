import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateChargeDto {
    @IsDefined()
    @IsNotEmpty()
    token: string;

    @IsNumber()
    amount: number;
}
