import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { CpfCnpjService } from '../services/cpf-cnpj.service';

@Controller('cpf-cnpj')
export class CpfCnpjController {
  constructor(private readonly cpfService: CpfCnpjService) {}

  @Post()
  async create(@Body('document') document: string) {
    return await this.cpfService.create(document);
  }

  @Get()
  async findAll() {
    return await this.cpfService.findAll();
  }

  @Get(':document')
  async findOne(@Param('document') document: string) {
    return await this.cpfService.findOne(document);
  }

  @Patch('blocklist/:document')
  async update(
    @Param('document') document: string,
    @Body('blocklist') blocklist: boolean,
  ) {
    return await this.cpfService.update(document, blocklist);
  }

  @Delete(':document')
  async delete(@Param('document') document: string) {
    return await this.cpfService.delete(document);
  }

  @Get('consult/:document')
  async consult(@Param('document') document: string) {
    return await this.cpfService.consult(document);
  }
}
