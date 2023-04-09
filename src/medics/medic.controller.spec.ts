import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { Certificate } from './entities/certificate.entity';
import { Hospital } from './entities/hospital.entity';
import { Medic } from './entities/medic.entity';
import { MedicAppService } from './medic-app.service';
import { MedicController } from './medic.controller';
import { MedicDomainService } from './medic-domain.service';
import { MedicModule } from './medic.module';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

describe('MedicController', () => {
  let medicController: MedicController;
  let mockMedicRepository: Repository<Medic>;
  let mockCertificateRepository: Repository<Certificate>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
        MedicModule,
      ],
      controllers: [MedicController],
      providers: [
        MedicAppService,
        MedicDomainService,
        {
          provide: getRepositoryToken(Medic),
          useValue: mockMedicRepository,
        },
        {
          provide: getRepositoryToken(Certificate),
          useValue: mockCertificateRepository,
        },
      ],
    }).compile();

    medicController = app.get<MedicController>(MedicController);
  });

  describe('listMedics', () => {
    it('should check if the specified medic exists on the list.', async () => {
      const medic = {
        id: 'ea4d5b9b-77ae-488a-a38c-7c39e41779ed',
        fullName: 'Camilo Goes de Olivardo',
        isActive: true,
      };

      expect(await medicController.listMedics()).toContainEqual(medic);
    });
  });

  describe('createMedic', () => {
    it('should create a medic and check if it exists.', async () => {
      const medic = {
        fullName: 'Howard McCardy',
      };

      const newMedic = await medicController.createMedic(medic);

      expect(newMedic.fullName).toBe(medic.fullName);
    });
  });

  describe('createMedicCertificate', () => {
    it('should create or update a medic certificate by UUID', async () => {
      const certificateData = {
        registerNumber: 'CRM_2019',
        expirationDate: new Date('2023-05-07'),
      };
      const response = await medicController.createMedicCertificate(
        'ea4d5b9b-77ae-488a-a38c-7c39e41779ed',
        certificateData,
      );

      expect(response.registerNumber).toBe(certificateData.registerNumber);
    });
  });
});
