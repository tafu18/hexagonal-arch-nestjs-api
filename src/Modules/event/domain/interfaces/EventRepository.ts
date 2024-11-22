import { Event } from '../entities/Event';

export interface EventRepository {
  create(event: Event): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  findTicketsByEventId(id: string): Promise<Event | null>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Event[]>;
}
