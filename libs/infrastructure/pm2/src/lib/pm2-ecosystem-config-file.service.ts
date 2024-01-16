import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { StartOptions } from 'pm2';
import { Pm2Configuration } from './pm2.configuration';

@Injectable()
export class Pm2EcosystemConfigFileService {
  constructor(private readonly pm2Configuration: Pm2Configuration) {}

  async read(): Promise<{ apps: StartOptions[] }> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const ecosystemConfigJsModule = JSON.parse(
        (await readFile(this.pm2Configuration.ecosystemConfigFile)).toString()
      );
      return ecosystemConfigJsModule;
    } catch (err) {
      return { apps: [] };
    }
  }

  async write({ apps }: { apps: StartOptions[] }) {
    const content = JSON.stringify({ apps }, null, 2);
    await writeFile(this.pm2Configuration.ecosystemConfigFile, content);
  }
}
