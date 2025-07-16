import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class FindManyWebhookArgs {
  @ApiPropertyOptional({ type: Number })
  @IsNumberString()
  @IsOptional()
  @Type(() => Number)
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  @IsNumberString()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  searchText?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsUUID()
  tenantId?: string;
}
