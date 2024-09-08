import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from '.';
import { LoggerModule } from './logger/logger.module';

@Module({
    providers: [CommonService],
    exports: [CommonService],
    imports: [DatabaseModule, LoggerModule],
})
export class CommonModule {}
