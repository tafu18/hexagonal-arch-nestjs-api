import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../domain/interfaces/EventRepository';
import { Event } from '../../domain/entities/Event';

@Injectable()
export class GetTicketsByEventIdUseCase {
  constructor(
    @Inject('EventRepository') // Sağlayıcı adı burada önemli
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(event_id: string): Promise<Event | null> {
    if (!event_id || event_id.trim() === '') {
      throw new Error('Event ID is required.');
    }

    const event = await this.eventRepository.findTicketsByEventId(event_id);
    if (!event) {
      throw new Error(`Event with ID ${event_id} not found.`);
    }

    return event;
  }
}
