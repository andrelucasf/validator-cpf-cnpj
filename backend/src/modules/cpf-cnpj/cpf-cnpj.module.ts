import { Module } from '@nestjs/common';
import { CpfCnpjService } from './services/cpf-cnpj.service';
import { CpfCnpjController } from './controllers/cpf-cnpj.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpfCnpj } from './entities/cpf-cnpj.entity';
import { CpfCnpjRepository } from './infra/typeorm/cpf-cnpj.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CpfCnpj])],
  providers: [
    CpfCnpjService,
    {
      provide: 'ICpfCnpjRepository',
      useClass: CpfCnpjRepository,
    },
  ],
  controllers: [CpfCnpjController],
  exports: [TypeOrmModule],
})
export class CpfCnpjModule {}
