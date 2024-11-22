import { Repository } from 'typeorm';
import { Ticket } from '../../domain/entities/Ticket';
import { TicketRepository } from '../../domain/interfaces/TicketRepository';
import { TicketEntity } from '../database/Ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class TicketRepositoryAdapter implements TicketRepository {
  constructor(
    @InjectRepository(TicketEntity) // TypeORM repository'sini enjekte ediyoruz
    private readonly repository: Repository<TicketEntity>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    const ticketEntity = this.repository.create(ticket); // TypeORM create method
    const savedEntity = await this.repository.save(ticketEntity);
    return this.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Ticket | null> {
    const ticketEntity = await this.repository.findOne({ where: { id } });
    return ticketEntity ? this.toDomain(ticketEntity) : null;
  }

  async findByEventId(event_id: string): Promise<Ticket[]> {
    const ticketEntities = await this.repository.find({ where: { event_id } });
    return ticketEntities.map(this.toDomain);
  }

  async update(ticket: Ticket): Promise<Ticket> {
    await this.repository.update(ticket.id, ticket);
    const updatedEntity = await this.repository.findOne({
      where: { id: ticket.id },
    });
    if (!updatedEntity) {
      throw new Error(`Ticket with ID ${ticket.id} not found.`);
    }
    return this.toDomain(updatedEntity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDomain(entity: TicketEntity): Ticket {
    return new Ticket(
      entity.id,
      entity.event_id,
      entity.buyerName,
      entity.buyerEmail,
      entity.price,
      entity.purchasedAt,
    );
  }
}
