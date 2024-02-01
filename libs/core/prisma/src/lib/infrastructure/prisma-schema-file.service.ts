import { Injectable } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { PrismaConfiguration } from '../prisma.configuration';
import { PrismaError } from '../prisma-errors';
import { dirname } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class PrismaSchemaFileService {
  constructor(protected readonly prismaConfiguration: PrismaConfiguration) {}

  getPrismaSchemaFilePath() {
    if (!this.prismaConfiguration.prismaSchemaFile) {
      throw new PrismaError('prismaSchemaFile not set');
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
      const fileDir = dirname(prismaSchemaFile);
      if (!existsSync(fileDir)) {
        await mkdir(fileDir, { recursive: true });
      }
      await writeFile(prismaSchemaFile, data);
    } catch (err) {
      //
    }
  }
}
