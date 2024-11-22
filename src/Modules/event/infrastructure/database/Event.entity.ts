import { TicketEntity } from 'src/Modules/ticket/infrastructure/database/Ticket.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column('timestamp')
  date: Date;

  @Column()
  location: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.event) // Event ile ilişkilendirilen biletler
  tickets: TicketEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  canBeUpdated(): boolean {
    // Domain'e uygun bir koşul ekleyin
    return true;
  }
}
