import { ApiProperty } from '@nestjs/swagger';

export class TwoFactorUserDto {
  @ApiProperty({
    type: 'string',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  username!: string | null;
  @ApiProperty({
    type: 'string',
  })
  secret!: string;
  @ApiProperty({
    type: 'string',
  })
  externalTenantId!: string;
  @ApiProperty({
    type: 'string',
  })
  externalUserId!: string;
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
