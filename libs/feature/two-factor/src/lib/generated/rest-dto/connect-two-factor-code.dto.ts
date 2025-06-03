import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TwoFactorCodeUserIdOperationNameTypeCodeExternalTenantIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  userId!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  operationName!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  type!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  code!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  externalTenantId!: string;
}

@ApiExtraModels(TwoFactorCodeUserIdOperationNameTypeCodeExternalTenantIdUniqueInputDto)
export class ConnectTwoFactorCodeDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: TwoFactorCodeUserIdOperationNameTypeCodeExternalTenantIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => TwoFactorCodeUserIdOperationNameTypeCodeExternalTenantIdUniqueInputDto)
  userId_operationName_type_code_externalTenantId?: TwoFactorCodeUserIdOperationNameTypeCodeExternalTenantIdUniqueInputDto;
}
