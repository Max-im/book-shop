import { v4 as uuid } from 'uuid';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsString, IsDate } from 'class-validator';
import { User } from 'apps/auth/src/entities/user.entity';

@Entity({ name: 'reservations' })
export class Reservation {
    @PrimaryColumn({ type: 'uuid', default: uuid() })
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    startDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @IsDate()
    endDate: Date;

    @ManyToOne(() => User, (user) => user.reservations, { eager: true })
    user: User;

    @Column()
    @IsString()
    placeId: string;

    @Column()
    @IsString()
    invoiceId: string;
}
