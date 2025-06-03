import { ApiProperty } from '@nestjs/swagger';
import { TwoFactorUser } from './two-factor-user.entity';

export class TwoFactorCode {
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
  userId!: string;
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
  @ApiProperty({
    type: () => TwoFactorUser,
    required: false,
  })
  TwoFactorUser?: TwoFactorUser;
}
