import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), { apiVersion: '2024-06-20' });

    constructor(private readonly configService: ConfigService) {}

    async createCharge({ card, amount }: CreateChargeDto) {
        const paymentMethod = await this.stripe.paymentMethods.create({ card, type: 'card' });
        const paymentIntent = await this.stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: amount * 100,
            confirm: true,
            payment_method_types: ['card'],
            currency: 'USD',
        });

        return paymentIntent;
    }
}