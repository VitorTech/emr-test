import { ConfigModule, ConfigService } from '@nestjs/config';

import { Certificate } from './medics/entities/certificate.entity';
import { Hospital } from './medics/entities/hospital.entity';
import { Medic } from './medics/entities/medic.entity';
import { MedicModule } from './medics/medic.module';
import { Module } from '@nestjs/common';
import { Schedule } from './medics/entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Medic, Certificate, Schedule, Hospital],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    MedicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
