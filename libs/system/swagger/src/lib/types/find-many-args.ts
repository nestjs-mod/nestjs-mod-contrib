import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FindManyArgs {
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
}
