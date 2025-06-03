import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationsUserExternalTenantIdExternalUserIdUniqueInputDto {
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

@ApiExtraModels(NotificationsUserExternalTenantIdExternalUserIdUniqueInputDto)
export class ConnectNotificationsUserDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: NotificationsUserExternalTenantIdExternalUserIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationsUserExternalTenantIdExternalUserIdUniqueInputDto)
  externalTenantId_externalUserId?: NotificationsUserExternalTenantIdExternalUserIdUniqueInputDto;
}
