import { Injectable } from '@nestjs/common';
import { Compose } from 'compose-spec-schema';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { Scalar, parse, stringify } from 'yaml';
import { DockerComposeConfiguration } from './docker-compose.configuration';

@Injectable()
export class DockerComposeFileService {
  constructor(protected readonly dockerComposeConfiguration: DockerComposeConfiguration) {}

  getDockerComposeFilePath() {
    return this.dockerComposeConfiguration.dockerComposeFile;
  }

  readFile(dockerComposeFile: string): Compose | undefined {
    if (dockerComposeFile && existsSync(dockerComposeFile)) {
      try {
        return parse(readFileSync(dockerComposeFile).toString());
      } catch (err) {
        return undefined;
      }
    }
    return undefined;
  }

  writeFile(dockerComposeFile: string, data: Compose, header?: string) {
    if (!dockerComposeFile) {
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      writeFileSync(
        dockerComposeFile,
        [header, stringify(data, { defaultStringType: Scalar.QUOTE_DOUBLE })].join('\n')
      );
    } catch (err) {
      //
    }
  }

  read(): Compose | undefined {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return undefined;
    }
    return this.readFile(dockerComposeFile);
  }

  write(data: Compose, header?: string) {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      this.writeFile(dockerComposeFile, data, header);
    } catch (err) {
      return;
    }
  }
}
