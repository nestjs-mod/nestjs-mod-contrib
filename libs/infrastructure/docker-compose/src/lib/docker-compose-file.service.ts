import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { Scalar, parse, stringify } from 'yaml';
import { DockerComposeConfiguration } from './docker-compose.configuration';
import { DockerComposeFeatureConfiguration } from './docker-compose.feature-configuration';

@Injectable()
export class DockerComposeFileService {
  constructor(protected readonly dockerComposeConfiguration: DockerComposeConfiguration) { }

  getDockerComposeFilePath() {
    return this.dockerComposeConfiguration.dockerComposeFile;
  }

  readFile(dockerComposeFile: string): DockerComposeFeatureConfiguration | undefined {
    if (dockerComposeFile && existsSync(dockerComposeFile)) {
      try {
        return parse(readFileSync(dockerComposeFile).toString());
      } catch (err) {
        return undefined;
      }
    }
    return undefined;
  }

  writeFile(dockerComposeFile: string, data: DockerComposeFeatureConfiguration, header?: string) {
    if (!dockerComposeFile) {
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (fileDir && !existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }

      for (const serviceName of Object.keys(data.services || {})) {
        delete data.services![serviceName].excludeContainerNameFromEnvironmentName;
        delete data.services![serviceName].keysOfEnvironmentsWithStaticValue;
      }

      writeFileSync(
        dockerComposeFile,
        [
          header,
          stringify(data, { defaultStringType: Scalar.QUOTE_DOUBLE, defaultKeyType: Scalar.PLAIN, lineWidth: 0 })
            .split(fileDir)
            .join('.'),
        ].join('\n')
      );
    } catch (err) {
      //
    }
  }

  read(): DockerComposeFeatureConfiguration | undefined {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return undefined;
    }
    return this.readFile(dockerComposeFile);
  }

  write(data: DockerComposeFeatureConfiguration, header?: string) {
    const dockerComposeFile = this.getDockerComposeFilePath();
    if (!dockerComposeFile) {
      return;
    }
    try {
      const fileDir = dirname(dockerComposeFile);
      if (fileDir) {
        if (!existsSync(fileDir)) {
          mkdirSync(fileDir, { recursive: true });
        }
        this.writeFile(dockerComposeFile, data, header);
      }
    } catch (err) {
      return;
    }
  }
}
