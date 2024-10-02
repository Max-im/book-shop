import { IsEmail } from 'class-validator';
import { CreateChargeDto } from '.';

export class PaymentsCreateChargeDto extends CreateChargeDto {
    @IsEmail()
    email: string;
}
