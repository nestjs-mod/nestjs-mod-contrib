import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { StartOptions } from 'pm2';
import { Pm2Configuration } from './pm2.configuration';

@Injectable()
export class Pm2EcosystemConfigFileService {
  constructor(private readonly pm2Configuration: Pm2Configuration) {}

  getEcosystemConfigFilePath() {
    return this.pm2Configuration.ecosystemConfigFile;
  }

  read(): { apps: StartOptions[] } {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ecosystemConfigJsModule = JSON.parse(readFileSync(this.getEcosystemConfigFilePath()).toString());
      return ecosystemConfigJsModule;
    } catch (err) {
      return { apps: [] };
    }
  }

  write({ apps }: { apps: StartOptions[] }) {
    if (!this.getEcosystemConfigFilePath()) {
      return;
    }
    const content = JSON.stringify({ apps }, null, 2);
    const fileDir = dirname(this.getEcosystemConfigFilePath());
    if (fileDir) {
      if (!existsSync(fileDir)) {
        mkdirSync(fileDir, { recursive: true });
      }
      writeFileSync(this.getEcosystemConfigFilePath(), content);
    }
  }
}
