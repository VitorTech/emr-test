import { Certificate } from './entities/certificate.entity';
import { Medic } from './entities/medic.entity';
import { MedicAppService } from './medic-app.service';
import { MedicController } from './medic.controller';
import { MedicDomainService } from './medic-domain.service';
import { Module } from '@nestjs/common';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Medic, Certificate, Schedule])],
  controllers: [MedicController],
  providers: [MedicAppService, MedicDomainService],
})
export class MedicModule {}
