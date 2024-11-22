import { Injectable } from '@nestjs/common';
import { Event } from '../entities/Event';

@Injectable()
export class EventValidationService {
  validate(event: Event): void {
    if (!event.name || event.name.trim() === '') {
      throw new Error('Event name is required.');
    }
    if (!event.date || isNaN(event.date.getTime())) {
      throw new Error('Valid event date is required.');
    }
    if (!event.location || event.location.trim() === '') {
      throw new Error('Event location is required.');
    }
  }
}
