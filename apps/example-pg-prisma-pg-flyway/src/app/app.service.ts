//import { InjectPrismaClient, FakePrismaClient as PrismaClient } from '@nestjs-mod/prisma';
import { InjectPrismaClient } from '@nestjs-mod/prisma';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../prisma-client';

@Injectable()
export class AppService {
  constructor(
    @InjectPrismaClient()
    private readonly prismaService: PrismaClient
  ) {}

  async getDate(): Promise<Date> {
    const result = await this.prismaService.$queryRaw<[{ now: Date }]>`SELECT NOW() as now;`;
    return result[0].now;
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser({ externalUserId }: { externalUserId: string }) {
    return await this.prismaService.pgFlywayPrismaUser.create({ data: { externalUserId } });
  }

  async getUsers() {
    return await this.prismaService.pgFlywayPrismaUser.findMany();
  }
}
