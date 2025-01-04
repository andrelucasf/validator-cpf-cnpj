import { Test, TestingModule } from '@nestjs/testing';
import { CpfCnpjService } from './cpf-cnpj.service';

const mockCpfCnpjRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CpfCnpjService', () => {
  let service: CpfCnpjService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CpfCnpjService,
        {
          provide: 'ICpfCnpjRepository',
          useValue: mockCpfCnpjRepository,
        },
      ],
    }).compile();

    service = module.get<CpfCnpjService>(CpfCnpjService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
