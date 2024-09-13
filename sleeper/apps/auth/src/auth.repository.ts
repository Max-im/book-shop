import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthRepository {
    private readonly repository: Repository<User>;
    protected readonly logger = new Logger(AuthRepository.name);

    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(User);
    }

    create(user: User) {
        return this.repository.save(user);
    }

    getByEmail(email: string) {
        return this.repository.findOneBy({ email });
    }

    getById(id: string) {
        return this.repository.findOneBy({ id });
    }
}
