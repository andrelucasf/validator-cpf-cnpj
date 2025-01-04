import { Test, TestingModule } from '@nestjs/testing';
import { CpfCnpjController } from './cpf-cnpj.controller';
import { CpfCnpjService } from '../services/cpf-cnpj.service';

const mockCpfCnpjService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CpfCnpjController', () => {
  let controller: CpfCnpjController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CpfCnpjController],
      providers: [
        {
          provide: CpfCnpjService,
          useValue: mockCpfCnpjService,
        },
      ],
    }).compile();

    controller = module.get<CpfCnpjController>(CpfCnpjController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
