import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './application/dtos/CreateTicketDto';
import { TicketResponseDto } from './application/dtos/TicketResponseDto';
import { CreateTicketUseCase } from './application/use-cases/CreateTicketUseCase';
import { GetTicketUseCase } from './application/use-cases/GetTicketUseCase';
import { DeleteTicketUseCase } from './application/use-cases/DeleteTicketUseCase';

@Injectable()
export class TicketService {
  constructor(
    private readonly createTicketUseCase: CreateTicketUseCase,
    private readonly getTicketUseCase: GetTicketUseCase,
    private readonly deleteTicketUseCase: DeleteTicketUseCase,
  ) {}

  async createTicket(
    createTicketDto: CreateTicketDto,
  ): Promise<TicketResponseDto> {
    const ticket = await this.createTicketUseCase.execute(createTicketDto);
    return new TicketResponseDto(
      ticket.id,
      ticket.event_id,
      ticket.buyerName,
      ticket.buyerEmail,
      ticket.price,
      ticket.purchasedAt,
    );
  }

  async getTicketById(ticketId: string): Promise<TicketResponseDto> {
    const ticket = await this.getTicketUseCase.execute(ticketId);
    return new TicketResponseDto(
      ticket.id,
      ticket.event_id,
      ticket.buyerName,
      ticket.buyerEmail,
      ticket.price,
      ticket.purchasedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.deleteTicketUseCase.execute(id);
    return;
  }
}
