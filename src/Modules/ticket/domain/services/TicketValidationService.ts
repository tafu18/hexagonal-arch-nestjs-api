import { Injectable } from '@nestjs/common';
import { Ticket } from '../entities/Ticket';

@Injectable()
export class TicketValidationService {
  validate(ticket: Ticket): void {
    if (!ticket.event_id || ticket.event_id.trim() === '') {
      throw new Error('Event ID is required.');
    }
    if (!ticket.buyerName || ticket.buyerName.trim() === '') {
      throw new Error('Buyer name is required.');
    }
    if (!ticket.buyerEmail || !this.isValidEmail(ticket.buyerEmail)) {
      throw new Error('A valid buyer email is required.');
    }
    if (ticket.price <= 0) {
      throw new Error('Ticket price must be greater than zero.');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
