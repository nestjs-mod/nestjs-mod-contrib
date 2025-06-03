import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorCodeDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
  })
  type!: string;
  @ApiProperty({
    type: 'string',
  })
  operationName!: string;
  @ApiProperty({
    type: 'string',
  })
  code!: string;
  @ApiProperty({
    type: 'boolean',
  })
  used!: boolean;
  @ApiProperty({
    type: 'boolean',
  })
  outdated!: boolean;
  @ApiProperty({
    type: 'string',
  })
  externalTenantId!: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  createdAt!: Date;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  updatedAt!: Date;
}
