import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { FlywayError } from '../flyway-errors';
import { FlywayConfiguration } from '../flyway.configuration';

@Injectable()
export class FlywayConfigFileService {
  constructor(protected readonly flywayConfiguration: FlywayConfiguration) {}

  getFlywayConfigFilePath() {
    if (!this.flywayConfiguration.flywayConfigFile) {
      throw new FlywayError('flywayConfigFile not set');
    }
    return this.flywayConfiguration.flywayConfigFile;
  }

  read(): string | undefined {
    const flywayConfigFile = this.getFlywayConfigFilePath();
    if (!flywayConfigFile) {
      return undefined;
    }
    try {
      return readFileSync(flywayConfigFile).toString();
    } catch (err) {
      return undefined;
    }
  }

  write(data: string) {
    const flywayConfigFile = this.getFlywayConfigFilePath();

    if (!flywayConfigFile) {
      return;
    }
    try {
      const fileDir = dirname(flywayConfigFile);
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      writeFileSync(flywayConfigFile, data);
    } catch (err) {
      //
    }
  }
}
