import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'hospital_medics_medic' })
export class HospitalMedic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  hospitalId: string;

  @Column('uuid')
  medicId: string;
}
