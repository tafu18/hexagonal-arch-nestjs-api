import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from '../../domain/entities/Event';
import { EventRepository } from '../../domain/interfaces/EventRepository';
import { UpdateEventDto } from '../dtos/UpdateEventDto';

@Injectable()
export class UpdateEventUseCase {
  constructor(
    @Inject('EventRepository')
    private readonly eventRepository: EventRepository,
  ) {}

  async execute(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const { ...updates } = updateEventDto;

    const updatedEvent = await this.eventRepository.updatePartial(id, updates);

    if (!updatedEvent) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }

    return updatedEvent;
  }
}
