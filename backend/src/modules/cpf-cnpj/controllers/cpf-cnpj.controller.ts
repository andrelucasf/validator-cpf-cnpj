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
import { ApiBody, ApiParam, ApiOperation } from '@nestjs/swagger';
import { CreateDocumentDto } from '../dto/create.dto';
import { UpdateBlocklistDto } from '../dto/update.dto';

@Controller('cpf-cnpj')
export class CpfCnpjController {
  constructor(private readonly cpfService: CpfCnpjService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo CPF ou CNPJ' })
  @ApiBody({
    description: 'Dados do documento para validação ou registro.',
    type: CreateDocumentDto,
  })
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return await this.cpfService.create(createDocumentDto.document);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os documentos' })
  async findAll() {
    return await this.cpfService.findAll();
  }

  @Get(':document')
  @ApiOperation({ summary: 'Consulta um CPF ou CNPJ específico' })
  @ApiParam({
    name: 'document',
    description: 'O CPF ou CNPJ a ser consultado',
    type: String,
  })
  async findOne(@Param('document') document: string) {
    return await this.cpfService.findOne(document);
  }

  @Patch('blocklist/:document')
  @ApiOperation({ summary: 'Atualiza o status de blocklist de um CPF ou CNPJ' })
  @ApiParam({
    name: 'document',
    description: 'O CPF ou CNPJ a ser atualizado',
    type: String,
  })
  @ApiBody({
    description: 'Status de blocklist do documento (true/false)',
    type: UpdateBlocklistDto,
  })
  async update(
    @Param('document') document: string,
    @Body() updateBlocklistDto: UpdateBlocklistDto,
  ) {
    return await this.cpfService.update(document, updateBlocklistDto.blocklist);
  }

  @Delete(':document')
  @ApiOperation({ summary: 'Deleta um CPF ou CNPJ do sistema' })
  @ApiParam({
    name: 'document',
    description: 'O CPF ou CNPJ a ser deletado',
    type: String,
  })
  async delete(@Param('document') document: string) {
    return await this.cpfService.delete(document);
  }

  @Get('consult/:document')
  @ApiOperation({ summary: 'Consulta um CPF ou CNPJ no sistema' })
  @ApiParam({
    name: 'document',
    description: 'O CPF ou CNPJ a ser consultado',
    type: String,
  })
  async consult(@Param('document') document: string) {
    return await this.cpfService.consult(document);
  }
}
