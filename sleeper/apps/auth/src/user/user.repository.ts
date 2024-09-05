import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository {
    private readonly repository: Repository<User>;
    protected readonly logger = new Logger(UserRepository.name);

    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(User);
    }

    create(user: User) {
        return this.repository.save(user);
    }
}
