import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class NotificationsEventSenderUserIdRecipientUserIdOperationNameTypeHtmlSubjectExternalTenantIdUniqueInputDto {
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  senderUserId!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  recipientUserId!: string;
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
  html!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  subject!: string;
  @ApiProperty({
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  externalTenantId!: string;
}

@ApiExtraModels(NotificationsEventSenderUserIdRecipientUserIdOperationNameTypeHtmlSubjectExternalTenantIdUniqueInputDto)
export class ConnectNotificationsEventDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString()
  id?: string;
  @ApiProperty({
    type: NotificationsEventSenderUserIdRecipientUserIdOperationNameTypeHtmlSubjectExternalTenantIdUniqueInputDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationsEventSenderUserIdRecipientUserIdOperationNameTypeHtmlSubjectExternalTenantIdUniqueInputDto)
  senderUserId_recipientUserId_operationName_type_html_subject_externalTenantId?: NotificationsEventSenderUserIdRecipientUserIdOperationNameTypeHtmlSubjectExternalTenantIdUniqueInputDto;
}
