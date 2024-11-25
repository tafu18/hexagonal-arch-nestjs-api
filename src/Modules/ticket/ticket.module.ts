import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TicketRepositoryAdapter } from './infrastructure/adapters/TicketRepositoryAdapter';
import { TicketValidationService } from './domain/services/TicketValidationService';
import { CreateTicketUseCase } from './application/use-cases/CreateTicketUseCase';
import { GetTicketUseCase } from './application/use-cases/GetTicketUseCase';
import { TicketEntity } from './infrastructure/database/Ticket.entity';
import { DeleteTicketUseCase } from './application/use-cases/DeleteTicketUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [
    TicketValidationService,
    TicketService,
    CreateTicketUseCase,
    DeleteTicketUseCase,
    {
      provide: 'TicketRepository',
      useClass: TicketRepositoryAdapter,
    },
    GetTicketUseCase,
  ],
})
export class TicketModule {}
