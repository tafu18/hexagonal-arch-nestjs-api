import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './application/dtos/CreateEventDto';
import { EventResponseDto } from './application/dtos/EventResponseDto';
import { CreateEventUseCase } from './application/use-cases/CreateEventUseCase';
import { GetEventUseCase } from './application/use-cases/GetEventUseCase';
import { GetTicketsByEventIdUseCase } from './application/use-cases/GetTicketsByEventIdUseCase';
import { GetAllEventUseCase } from './application/use-cases/GetAllEventUseCase';

@Injectable()
export class EventService {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getEventUseCase: GetEventUseCase,
    private readonly getTicketsByEventIdUseCase: GetTicketsByEventIdUseCase,
    private readonly getAllEventUseCase: GetAllEventUseCase,
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
    const event = await this.getTicketsByEventIdUseCase.execute(event_id);

    return new EventResponseDto(
      event.id,
      event.name,
      event.date,
      event.location,
      event.createdAt,
      event.updatedAt,
      event.description,
      event.tickets || [],
    );
  }

  async getAllEvent(): Promise<EventResponseDto[]> {
    const events = await this.getAllEventUseCase.execute();
    const eventDtos = events.map(
      (event) =>
        new EventResponseDto(
          event.id,
          event.name,
          event.date,
          event.location,
          event.createdAt,
          event.updatedAt,
          event.description,
          event.tickets, // Biletleri DTO'ya ekle
        ),
    );

    return eventDtos; // DTO dizisini döndür
  }
}
