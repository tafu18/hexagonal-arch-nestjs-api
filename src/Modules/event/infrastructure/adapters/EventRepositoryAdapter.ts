import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../database/Event.entity';
import { EventRepository } from '../../domain/interfaces/EventRepository';
import { Event } from '../../domain/entities/Event';

@Injectable()
export class EventRepositoryAdapter implements EventRepository {
  constructor(
    @InjectRepository(EventEntity) // TypeORM repository'sini enjekte ediyoruz
    private readonly repository: Repository<EventEntity>,
  ) {}

  async create(event: Event): Promise<Event> {
    const eventEntity = this.repository.create(event);
    const savedEntity = await this.repository.save(eventEntity);
    return { ...savedEntity, canBeUpdated: () => true } as Event; // canBeUpdated eklendi
  }

  async findById(id: string): Promise<Event | null> {
    const eventEntity = await this.repository.findOne({ where: { id } });
    if (!eventEntity) {
      return null;
    }
    return { ...eventEntity, canBeUpdated: () => true } as Event; // canBeUpdated eklendi
  }

  async findTicketsByEventId(id: string): Promise<Event | null> {
    const eventEntity = await this.repository.findOne({
      where: { id },
      relations: ['tickets'], // İlişkili biletleri de yükleyelim
    });

    if (!eventEntity) {
      return null;
    }
    return {
      ...eventEntity,
      tickets: eventEntity.tickets, // Etkinlik ile ilişkili biletler
      canBeUpdated: () => true,
    } as Event;
  }

  async update(event: Event): Promise<Event> {
    const eventEntity = await this.repository.preload(event);
    if (!eventEntity) {
      throw new Error('Event not found');
    }
    const updatedEntity = await this.repository.save(eventEntity);
    return { ...updatedEntity, canBeUpdated: () => true } as Event; // canBeUpdated eklendi
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<Event[]> {
    const events = await this.repository.find();
    return events.map(
      (eventEntity) =>
        ({
          ...eventEntity,
          canBeUpdated: () => true, // canBeUpdated eklendi
        }) as Event,
    );
  }
}
