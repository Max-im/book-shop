import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';
import { ReservationRepository } from './reservation.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationService {
    constructor(
        // @InjectRepository(ReservationRepository)
        private readonly repository: ReservationRepository,
        @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
    ) {}

    async create(createReservationDto: CreateReservationDto, userId: string, email: string) {
        const payload = { ...createReservationDto.charge, email };

        return await this.paymentService.send('create_charge', payload).pipe(
            map(async (response) => {
                const reservation = new Reservation();
                Object.assign(reservation, { ...createReservationDto, userId, invoiceId: response.id });
                await this.repository.saveReservation(reservation);

                const obj: any = { ...reservation, paymentId: response.id };
                delete obj.charge;
                return obj;
            }),
        );
    }

    async findAll() {
        return await this.repository.findAll();
    }

    async findOne(id: number) {
        return `This action returns a #${id} reservation`;
    }

    update(id: number, updateReservationDto: UpdateReservationDto) {
        return `This action updates a #${id} reservation`;
    }

    remove(id: number) {
        return `This action removes a #${id} reservation`;
    }
}
