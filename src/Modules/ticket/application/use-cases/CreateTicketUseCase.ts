import { Inject } from '@nestjs/common';
import { Ticket } from '../../domain/entities/Ticket';
import { TicketRepository } from '../../domain/interfaces/TicketRepository';
import { CreateTicketDto } from '../dtos/CreateTicketDto';

export class CreateTicketUseCase {
  constructor(
    @Inject('TicketRepository') // 'TicketRepository' token'ı enjekte ediliyor
    private readonly ticketRepository: TicketRepository,
  ) {}

  async execute(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { id, event_id, buyerName, buyerEmail, price, purchasedAt } =
      createTicketDto;

    const ticket = new Ticket(
      id,
      event_id,
      buyerName,
      buyerEmail,
      price,
      purchasedAt,
    );

    return await this.ticketRepository.create(ticket);
  }
}
