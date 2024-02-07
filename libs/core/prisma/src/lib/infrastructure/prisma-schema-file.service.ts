import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { PrismaError } from '../prisma-errors';
import { PrismaConfiguration } from '../prisma.configuration';

@Injectable()
export class PrismaSchemaFileService {
  constructor(protected readonly prismaConfiguration: PrismaConfiguration) {}

  getPrismaSchemaFilePath() {
    if (!this.prismaConfiguration.prismaSchemaFile) {
      throw new PrismaError('prismaSchemaFile not set');
    }
    return this.prismaConfiguration.prismaSchemaFile;
  }

  read(): string | undefined {
    const prismaSchemaFile = this.getPrismaSchemaFilePath();
    if (!prismaSchemaFile) {
      return undefined;
    }
    try {
      return readFileSync(prismaSchemaFile).toString();
    } catch (err) {
      return undefined;
    }
  }

  write(data: string) {
    const prismaSchemaFile = this.getPrismaSchemaFilePath();

    if (!prismaSchemaFile) {
      return;
    }
    try {
      const fileDir = dirname(prismaSchemaFile);
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      writeFileSync(prismaSchemaFile, data);
    } catch (err) {
      //
    }
  }
}
