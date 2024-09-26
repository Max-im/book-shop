import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
    private readonly transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: this.configService.get('SMTP_USER'),
            clientId: this.configService.get('OAUTH_CLIENT_ID'),
            clientSecret: this.configService.get('OAUTH_CLIENT_SECRET'),
            refreshToken: this.configService.get('OAUTH_REFRESH_TOKEN'),
        },
    });

    constructor(private readonly configService: ConfigService) {}

    notifyEmail({ email, message }: NotifyEmailDto) {
        console.log(email, message);
        this.transporter.sendMail({
            from: this.configService.get('SMTP_USER'),
            to: email,
            subject: 'App Notification',
            text: message,
        });
    }
}
