import { Ticket } from 'src/Modules/ticket/domain/entities/Ticket';

export class EventResponseDto {
  id: string;
  name: string;
  description?: string;
  date: Date;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  tickets?: Ticket[]; // Biletler için Ticket[] tipi ekledik

  constructor(
    id: string,
    name: string,
    date: Date,
    location: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
    tickets: Ticket[] = [], // Biletler için opsiyonel bir parametre
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.tickets = tickets; // Biletleri burada alıp set ediyoruz
  }
}
