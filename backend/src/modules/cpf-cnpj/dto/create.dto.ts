import { ApiProperty } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'O CPF ou CNPJ a ser validado ou registrado',
    example: '123.456.789-00',
  })
  document: string;
}
