import { Inject, Injectable } from '@nestjs/common';
import { EventRepository } from '../../domain/interfaces/EventRepository';
import { Event } from '../../domain/entities/Event';

@Injectable()
export class GetAllEventUseCase {
  constructor(
    @Inject('EventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(): Promise<Event[] | null> {
    const event = await this.eventRepository.findAll();

    return event;
  }
}
