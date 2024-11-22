import { Inject } from '@nestjs/common';
import { Ticket } from '../../domain/entities/Ticket';
import { TicketRepository } from '../../domain/interfaces/TicketRepository';

export class GetTicketUseCase {
  constructor(
    @Inject('TicketRepository') // Sağlayıcı adı burada önemli
    private readonly ticketRepository: TicketRepository,
  ) {}
  async execute(ticketId: string): Promise<Ticket | null> {
    if (!ticketId || ticketId.trim() === '') {
      throw new Error('Ticket ID is required.');
    }

    const ticket = await this.ticketRepository.findById(ticketId);
    if (!ticket) {
      throw new Error(`Ticket with ID ${ticketId} not found.`);
    }

    return ticket;
  }
}
