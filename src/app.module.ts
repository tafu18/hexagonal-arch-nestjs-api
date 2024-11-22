import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './Modules/event/event.module';
import { TicketModule } from './Modules/ticket/ticket.module';

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
})
export class AppModule {
  constructor() {
    console.log(__dirname + '/**/*.entity.ts');
  }
}
