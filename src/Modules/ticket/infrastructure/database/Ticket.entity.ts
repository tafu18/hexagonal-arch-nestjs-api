import { EventEntity } from 'src/Modules/event/infrastructure/database/Event.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  event_id: string;

  @Column()
  buyerName: string;

  @Column()
  buyerEmail: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn({ type: 'timestamp' })
  purchasedAt: Date;

  @ManyToOne(() => EventEntity, (event) => event.tickets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
