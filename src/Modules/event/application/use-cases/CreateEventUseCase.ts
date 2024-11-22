import { Inject, Injectable } from '@nestjs/common';
import { Event } from '../../domain/entities/Event';
import { EventRepository } from '../../domain/interfaces/EventRepository';
import { CreateEventDto } from '../dtos/CreateEventDto';

@Injectable()
export class CreateEventUseCase {
  constructor(
    @Inject('EventRepository') // 'EventRepository' token'ı enjekte ediliyor
    private readonly eventRepository: EventRepository,
  ) {
    console.log('eventRepository:', this.eventRepository);
  }

  async execute(createEventDto: CreateEventDto): Promise<Event> {
    const { id, name, description, date, location } = createEventDto;

    const newEvent = new Event(
      id,
      name,
      date,
      location,
      new Date(),
      new Date(),
      description,
    );

    // Event Repository kullanımı
    return await this.eventRepository.create(newEvent); // Burada çağrılıyor
  }
}
