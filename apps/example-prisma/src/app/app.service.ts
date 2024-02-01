import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/prisma-user-client';

@Injectable()
export class AppService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

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
