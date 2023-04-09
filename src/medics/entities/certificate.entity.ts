import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Medic } from './medic.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'register_number' })
  registerNumber: string;

  @Column({ type: 'date', name: 'expiration_date' })
  expirationDate: Date;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => Medic)
  @JoinColumn()
  medic: Medic;
}
