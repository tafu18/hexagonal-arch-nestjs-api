import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './application/dtos/CreateEventDto';
import { EventResponseDto } from './application/dtos/EventResponseDto';
import { UpdateEventDto } from './application/dtos/UpdateEventDto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<EventResponseDto> {
    return await this.eventService.createEvent(createEventDto);
  }

  @Get(':id')
  async getEventById(@Param('id') event_id: string): Promise<EventResponseDto> {
    return await this.eventService.getEventById(event_id);
  }

  @Get(':id/tickets')
  async getTicketsByEventId(
    @Param('id') event_id: string,
  ): Promise<EventResponseDto> {
    return await this.eventService.getTicketsByEventId(event_id);
  }

  @Get()
  async getAllEvent() {
    return this.eventService.getAllEvent();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }
}
