import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsUUID } from 'class-validator';

export class FindManyWebhookLogArgs {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  curPage?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  searchText?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  sort?: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsUUID()
  webhookId!: string;
}
