import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './application/dtos/CreateEventDto';
import { EventResponseDto } from './application/dtos/EventResponseDto';
import { CreateEventUseCase } from './application/use-cases/CreateEventUseCase';
import { GetEventUseCase } from './application/use-cases/GetEventUseCase';
import { GetTicketsByEventIdUseCase } from './application/use-cases/GetTicketsByEventIdUseCase';

@Injectable()
export class EventService {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventUseCase: GetEventUseCase,
    private readonly getTicketsByEventIdUseCase: GetTicketsByEventIdUseCase,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = await this.createEventUseCase.execute(createEventDto);

    return new EventResponseDto(
      event.id,
      event.name,
      event.date,
      event.location,
      event.createdAt,
      event.updatedAt,
    );
  }

  async getEventById(event_id: string): Promise<EventResponseDto> {
    const event = await this.getEventUseCase.execute(event_id);
    return new EventResponseDto(
      event.id,
      event.name,
      event.date,
      event.location,
      event.createdAt,
      event.updatedAt,
      event.description,
    );
  }

  async getTicketsByEventId(event_id: string): Promise<EventResponseDto> {
    // Etkinlik ile ilişkili biletleri al
    const event = await this.getTicketsByEventIdUseCase.execute(event_id);

    // Biletler varsa, onları DTO'ya ekle
    return new EventResponseDto(
      event.id,
      event.name,
      event.date,
      event.location,
      event.createdAt,
      event.updatedAt,
      event.description,
      event.tickets || [], // Biletler varsa ekleyin, yoksa boş array döndürün
    );
  }
}
