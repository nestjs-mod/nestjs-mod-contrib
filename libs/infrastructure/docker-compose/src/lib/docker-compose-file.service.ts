import { Injectable } from '@nestjs/common';
import { Compose } from 'compose-spec-schema';
import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { parse, stringify } from 'yaml';
import { DockerComposeConfiguration } from './docker-compose.configuration';
import { dirname } from 'path';

@Injectable()
export class DockerComposeFileService {
  constructor(protected readonly dockerComposeConfiguration: DockerComposeConfiguration) {}

  getDockerComposeFilePath() {
    return this.dockerComposeConfiguration.dockerComposeFile;
  }

  async readFile(dockerComposeFile: string): Promise<Compose | undefined> {
    if (dockerComposeFile && existsSync(dockerComposeFile)) {
      try {
        return parse((await readFile(dockerComposeFile)).toString());
      } catch (err) {
        return undefined;
      }
    }
    return undefined;
  }

  async writeFile(dockerComposeFile: string, data: Compose, header?: string) {
    if (!dockerComposeFile){
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (!existsSync(fileDir)) {
        await mkdir(fileDir, { recursive: true });
      }
      await writeFile(dockerComposeFile, [header, stringify(data)].join('\n'));
    } catch (err) {
      //
    }
  }

  async read(): Promise<Compose | undefined> {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return undefined;
    }
    return this.readFile(dockerComposeFile);
  }

  async write(data: Compose, header?: string) {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (!existsSync(fileDir)) {
        await mkdir(fileDir, { recursive: true });
      }
      await this.writeFile(dockerComposeFile, data, header);
    } catch (err) {
      return;
    }
  }
}
