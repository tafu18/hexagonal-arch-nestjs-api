import { Inject } from '@nestjs/common';
import { TicketRepository } from '../../domain/interfaces/TicketRepository';

export class DeleteTicketUseCase {
  constructor(
    @Inject('TicketRepository') // 'TicketRepository' token'ı enjekte ediliyor
    private readonly ticketRepository: TicketRepository,
  ) {}

  async execute(id: string): Promise<void> {
    return await this.ticketRepository.delete(id);
  }
}
