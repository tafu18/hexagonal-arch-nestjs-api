import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepositoryAdapter } from './infrastructure/adapters/EventRepositoryAdapter';
import { EventEntity } from './infrastructure/database/Event.entity';
import { CreateEventUseCase } from './application/use-cases/CreateEventUseCase';
import { GetEventUseCase } from './application/use-cases/GetEventUseCase';
import { GetTicketsByEventIdUseCase } from './application/use-cases/GetTicketsByEventIdUseCase';
import { GetAllEventUseCase } from './application/use-cases/GetAllEventUseCase';
import { UpdateEventUseCase } from './application/use-cases/UpdateEventUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])], // EventEntity, TypeORM için ekleniyor
  controllers: [EventController],
  providers: [
    EventService,
    CreateEventUseCase,
    GetEventUseCase,
    GetTicketsByEventIdUseCase,
    GetAllEventUseCase,
    UpdateEventUseCase,
    {
      provide: 'EventRepository', // Bu token EventRepository'yi temsil eder
      useClass: EventRepositoryAdapter, // EventRepositoryAdapter sınıfı kullanılıyor
    },
  ],
})
export class EventModule {}
