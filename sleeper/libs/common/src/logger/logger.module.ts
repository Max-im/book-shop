import { Module } from '@nestjs/common';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        NestLoggerModule.forRoot({
            pinoHttp: {
              transport: {
                target: 'pino-pretty'
              }
            }
          }),
    ]
})
export class LoggerModule {}
