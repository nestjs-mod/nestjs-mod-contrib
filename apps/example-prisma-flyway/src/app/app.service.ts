import { InjectPrismaClient } from '@nestjs-mod/prisma';
// import { FakePrismaClient as PrismaClient, InjectPrismaClient } from '@nestjs-mod/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/flyway-prisma-client';

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
    return await this.prismaService.flywayPrismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.flywayPrismaUser.findMany();
  }
}
