import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Certificate } from './certificate.entity';
import { Schedule } from './schedule.entity';

@Entity()
export class Medic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fullname' })
  fullName: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => Certificate)
  certificate: Certificate;

  @OneToMany(() => Schedule, (schedule) => schedule.medic)
  schedules: Schedule[];
}
