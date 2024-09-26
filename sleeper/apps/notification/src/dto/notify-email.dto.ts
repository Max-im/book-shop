import { IsString, IsNotEmpty } from 'class-validator';

export class NotifyEmailDto {
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly message: string;
}
