import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlocklistDto {
  @ApiProperty({
    description: 'Indica se o documento deve ser bloqueado (true/false)',
    example: true, // Exemplo do valor
  })
  blocklist: boolean;
}
