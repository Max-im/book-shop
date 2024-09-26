import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationService {
    notifyEmail({ email, message }: NotifyEmailDto): string {
        console.log(email, message, '====================================');
        return 'Hello World!';
    }
}
