import Stripe from 'stripe';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common';
import { PaymentsCreateChargeDto } from './dto/payment-create-charge.dto';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2024-06-20' });

    constructor(
        private readonly configService: ConfigService,
        @Inject(NOTIFICATION_SERVICE) private readonly notificationService: ClientProxy,
    ) {}

    async createCharge({ token, amount, email }: PaymentsCreateChargeDto) {
        token = token || 'tok_visa';
        const charge = await this.stripe.charges.create({
            currency: 'usd',
            amount: amount * 100,
            source: token,
        });

        this.notificationService.emit('notify_email', { email, message: `Success Payment - ${amount}` });

        return charge;
    }
}
