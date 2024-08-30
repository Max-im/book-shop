import { v4 as uuid } from 'uuid';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

@Entity({ name: 'reservations' })
export class Reservation {
    @PrimaryColumn({ type: 'uuid', default: uuid() })
    id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    timestamp: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startDate: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    endDate: Date;

    // @ManyToOne(() => User, (user) => user.id)
    // user: User;

    @Column()
    userId: string;

    @Column()
    placeId: string;

    @Column()
    invoiceId: string;
}
