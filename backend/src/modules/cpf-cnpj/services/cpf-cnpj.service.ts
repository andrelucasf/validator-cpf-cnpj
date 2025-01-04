import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICpfCnpjRepository } from '../repositories/cpf-cnpj-repository.interface';
import { CpfCnpj } from '../entities/cpf-cnpj.entity';
import { validateCpf } from '../validators/cpf.validator';
import { validateCnpj } from '../validators/cnpj.validator';

@Injectable()
export class CpfCnpjService {
  constructor(
    @Inject('ICpfCnpjRepository')
    private readonly cpfCpnjRepository: ICpfCnpjRepository,
  ) {}

  async create(document: string): Promise<CpfCnpj> {
    const isValid = this.validateCpfCnpj(document);

    if (!isValid) throw new NotFoundException('Documento inválido');

    return this.cpfCpnjRepository.create(document);
  }

  async findAll(): Promise<CpfCnpj[]> {
    return this.cpfCpnjRepository.findAll();
  }

  async findOne(document: string): Promise<CpfCnpj> {
    const cpfCnpj = await this.cpfCpnjRepository.findOne(document);

    if (!cpfCnpj) throw new NotFoundException('Documento não encontrado');

    return cpfCnpj;
  }

  async update(document: string, blocklist: boolean): Promise<CpfCnpj> {
    return this.cpfCpnjRepository.update(document, blocklist);
  }

  async delete(document: string): Promise<void> {
    await this.cpfCpnjRepository.delete(document);
  }

  async consult(
    document: string,
  ): Promise<{ document: string; isValid: boolean }> {
    const isValid = this.validateCpfCnpj(document);

    if (!isValid) {
      return {
        document: document,
        isValid: false,
      };
    }

    return {
      document: document,
      isValid: true,
    };
  }

  validateCpfCnpj(document: string): boolean {
    const cpfCnpj = document.replace(/[^\d]+/g, '');

    if (cpfCnpj.length === 11) {
      return validateCpf(cpfCnpj);
    } else if (cpfCnpj.length === 14) {
      return validateCnpj(cpfCnpj);
    }
    return false;
  }
}
