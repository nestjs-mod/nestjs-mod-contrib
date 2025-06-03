import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TwoFactorUserExternalTenantIdExternalUserIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  externalTenantId!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  externalUserId!: string;
}

@ApiExtraModels(TwoFactorUserExternalTenantIdExternalUserIdUniqueInputDto)
export class ConnectTwoFactorUserDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: TwoFactorUserExternalTenantIdExternalUserIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TwoFactorUserExternalTenantIdExternalUserIdUniqueInputDto)
  externalTenantId_externalUserId?: TwoFactorUserExternalTenantIdExternalUserIdUniqueInputDto;
}
