import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CpfCnpj } from 'src/modules/cpf-cnpj/entities/cpf-cnpj.entity';
import { ICpfCnpjRepository } from 'src/modules/cpf-cnpj/repositories/cpf-cnpj-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CpfCnpjRepository implements ICpfCnpjRepository {
  constructor(
    @InjectRepository(CpfCnpj)
    private readonly cpfCnpjRepository: Repository<CpfCnpj>,
  ) {}

  async create(document: string): Promise<CpfCnpj> {
    const cpfCnpj = this.cpfCnpjRepository.create({ document });
    return this.cpfCnpjRepository.save(cpfCnpj);
  }

  async findAll(): Promise<CpfCnpj[]> {
    return this.cpfCnpjRepository.find();
  }

  async findOne(document: string): Promise<CpfCnpj> {
    return this.cpfCnpjRepository.findOne({
      where: {
        document: document,
      },
    });
  }

  async update(document: string, blocklist: boolean): Promise<CpfCnpj> {
    const cpfCnpj = await this.findOne(document);

    if (!cpfCnpj) {
      throw new NotFoundException('Documento não encontrado');
    }

    cpfCnpj.blocklist = blocklist;

    return this.cpfCnpjRepository.save(cpfCnpj);
  }

  async delete(document: string): Promise<void> {
    const cpfCnpj = await this.findOne(document);

    if (!cpfCnpj) {
      throw new NotFoundException('Documento não encontrado');
    }

    await this.delete(document);
  }
}
