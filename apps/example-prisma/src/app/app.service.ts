import { isInfrastructureMode } from '@nestjs-mod/common';
import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaClient } from '@prisma/prisma-user-client';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  onApplicationBootstrap() {
    // need for prisma integration
    if (isInfrastructureMode()) {
      setTimeout(() => process.exit(0), 30);
    }
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.prismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.prismaUser.findMany();
  }
}
