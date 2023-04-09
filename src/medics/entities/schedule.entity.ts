import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Medic } from './medic.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Medic, (medic) => medic.schedules)
  medic: Medic;
}
