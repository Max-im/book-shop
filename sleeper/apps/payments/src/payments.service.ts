import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2024-06-20' });

    constructor(private readonly configService: ConfigService) {}

    async createCharge({ token, amount }: CreateChargeDto) {
        token = token || 'tok_visa';
        const charge = await this.stripe.charges.create({
            currency: 'usd',
            amount: amount * 100,
            source: token,
        });

        return charge;
    }
}
