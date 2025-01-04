import { CpfCnpj } from '../entities/cpf-cnpj.entity';

export interface ICpfCnpjRepository {
  create(document: string): Promise<CpfCnpj>;
  findAll(): Promise<CpfCnpj[]>;
  findOne(document: string): Promise<CpfCnpj>;
  update(document: string, blocklist: boolean): Promise<CpfCnpj>;
  delete(document: string): Promise<void>;
}
