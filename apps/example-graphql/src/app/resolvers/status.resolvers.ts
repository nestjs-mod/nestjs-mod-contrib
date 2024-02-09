import { Logger } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { StatusDto } from './dto/status.dto';

@Resolver()
export class StatusResolvers {
  private logger = new Logger(StatusResolvers.name);

  @Query(() => StatusDto)
  async status(): Promise<StatusDto> {
    this.logger.log('graphql:status=OK');
    return { status: 'OK' };
  }
}
