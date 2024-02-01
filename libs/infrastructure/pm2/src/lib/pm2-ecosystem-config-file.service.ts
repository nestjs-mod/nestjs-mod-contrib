import { Injectable } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { StartOptions } from 'pm2';
import { Pm2Configuration } from './pm2.configuration';
import { dirname } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class Pm2EcosystemConfigFileService {
  constructor(private readonly pm2Configuration: Pm2Configuration) {}

  getEcosystemConfigFilePath() {
    return this.pm2Configuration.ecosystemConfigFile;
  }

  async read(): Promise<{ apps: StartOptions[] }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ecosystemConfigJsModule = JSON.parse((await readFile(this.getEcosystemConfigFilePath())).toString());
      return ecosystemConfigJsModule;
    } catch (err) {
      return { apps: [] };
    }
  }

  async write({ apps }: { apps: StartOptions[] }) {
    if (!this.getEcosystemConfigFilePath()) {
      return;
    }
    const content = JSON.stringify({ apps }, null, 2);
    const fileDir = dirname(this.getEcosystemConfigFilePath());
    if (!existsSync(fileDir)) {
      await mkdir(fileDir, { recursive: true });
    }
    await writeFile(this.getEcosystemConfigFilePath(), content);
  }
}
