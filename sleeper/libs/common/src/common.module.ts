import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { DatabaseModule } from '.';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [DatabaseModule, ConfigModule, LoggerModule],
})
export class CommonModule {}
