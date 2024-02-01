import { Injectable } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { FlywayConfiguration } from '../flyway.configuration';
import { FlywayError } from '../flyway-errors';
import { dirname } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FlywayConfigFileService {
  constructor(protected readonly flywayConfiguration: FlywayConfiguration) {}

  getFlywayConfigFilePath() {
    if (!this.flywayConfiguration.flywayConfigFile) {
      throw new FlywayError('flywayConfigFile not set');
    }
    return this.flywayConfiguration.flywayConfigFile;
  }

  async read(): Promise<string | undefined> {
    const flywayConfigFile = this.getFlywayConfigFilePath();
    if (!flywayConfigFile) {
      return undefined;
    }
    try {
      return (await readFile(flywayConfigFile)).toString();
    } catch (err) {
      return undefined;
    }
  }

  async write(data: string) {
    const flywayConfigFile = this.getFlywayConfigFilePath();

    if (!flywayConfigFile) {
      return;
    }
    try {
      const fileDir = dirname(flywayConfigFile);
      if (!existsSync(fileDir)) {
        await mkdir(fileDir, { recursive: true });
      }
      await writeFile(flywayConfigFile, data);
    } catch (err) {
      //
    }
  }
}
