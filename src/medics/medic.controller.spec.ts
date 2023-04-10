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
import { HospitalMedic } from './entities/hospital-medic.entity';

describe('MedicController', () => {
  let medicController: MedicController;

  let mockMedicRepository: Repository<Medic>;
  let mockCertificateRepository: Repository<Certificate>;
  let mockScheduleRepository: Repository<Schedule>;
  let mockHospitalMedicRepository: Repository<HospitalMedic>;

  let app: TestingModule = null;

  beforeEach(async () => {
    app = await Test.createTestingModule({
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
            entities: [Medic, Certificate, Schedule, Hospital, HospitalMedic],
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
        {
          provide: getRepositoryToken(Schedule),
          useValue: mockScheduleRepository,
        },
        {
          provide: getRepositoryToken(HospitalMedic),
          useValue: mockHospitalMedicRepository,
        },
      ],
    }).compile();

    medicController = app.get<MedicController>(MedicController);
  });

  afterEach(() => {
    app.close();
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
    it('should create or update a medic certificate to the specified medic.', async () => {
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

  describe('createMedicSchedule', () => {
    it('should create a schedule to the specified medic.', async () => {
      const scheduleData = {
        date: new Date('2023-05-07'),
      };

      const response = await medicController.createMedicSchedule(
        'ea4d5b9b-77ae-488a-a38c-7c39e41779ed',
        scheduleData,
      );

      expect(response.date).toBe(scheduleData.date);
    });
  });

  describe('createHospitalMedic', () => {
    it('should create a hospital medic relation.', async () => {
      const hospitalMedicData = {
        hospitalId: '3120647a-cfb1-4cba-a89f-380c082b3a08',
        medicId: '562d8d7e-7d8a-4d1a-a35c-2a1b795bbe6e',
      };

      const response = await medicController.createHospitalMedic(
        hospitalMedicData,
      );

      expect(response.hospitalId).toBe(hospitalMedicData.hospitalId);
      expect(response.medicId).toBe(hospitalMedicData.medicId);
    });
  });
});
