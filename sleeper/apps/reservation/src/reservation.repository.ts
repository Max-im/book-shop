import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from '@app/common';

@Injectable()
export class ReservationRepository {
    private readonly repository: Repository<Reservation>;
    protected readonly logger = new Logger(ReservationRepository.name);

    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(Reservation);
    }

    async saveReservation(reservation: Reservation): Promise<Reservation> {
        return this.repository.save(reservation);
    }

    async findAll() {
        return this.repository.find({});
    }
}
