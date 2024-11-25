import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './Modules/event/event.module';
import { TicketModule } from './Modules/ticket/ticket.module';
import { LoggerMiddleware } from './Mİddlewares/api.logger.middleware';
import { LoggerService } from './Helpers/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'events_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sadece geliştirme ortamında
      logging: true,
    }),
    EventModule,
    TicketModule,
  ],
  providers: [LoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
