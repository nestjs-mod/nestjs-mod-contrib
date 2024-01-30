import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { PrismaConfiguration } from '../prisma.configuration';
import { PrismaError } from '../prisma-errors';

@Injectable()
export class PrismaSchemaFileService {
  constructor(protected readonly prismaConfiguration: PrismaConfiguration) {}

  getPrismaSchemaFilePath() {
    if (!this.prismaConfiguration.prismaSchemaFile) {
      throw new PrismaError('prismaSchemaFile nop set');
    }
    return this.prismaConfiguration.prismaSchemaFile;
  }

  async read(): Promise<string | undefined> {
    const prismaSchemaFile = this.getPrismaSchemaFilePath();
    if (!prismaSchemaFile) {
      return undefined;
    }
    try {
      return (await readFile(prismaSchemaFile)).toString();
    } catch (err) {
      return undefined;
    }
  }

  async write(data: string) {
    const prismaSchemaFile = this.getPrismaSchemaFilePath();

    if (!prismaSchemaFile) {
      return;
    }
    try {
      await writeFile(prismaSchemaFile, data);
    } catch (err) {
      //
    }
  }
}
