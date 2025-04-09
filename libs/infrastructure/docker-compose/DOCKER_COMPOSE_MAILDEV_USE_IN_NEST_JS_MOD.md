An example of using Maildev, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-maildev.

```typescript
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMaildev } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-maildev');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-maildev', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    feature: [AppModule.forRoot()],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
          style: 'pretty',
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposeMaildev.forRoot(),
    ],
  },
});
```

After connecting the module to the application and `npm run build` and starting generation of documentation through `npm run docs:infrastructure`, you will have new files and scripts to run.

New scripts mostly `package.json`

Add database options to docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
version: '3'
services:
  example-maildev-maildev:
    image: 'maildev/maildev:2.2.1'
    container_name: 'example-maildev-maildev'
    ports:
      - '1025:1025'
      - '1080:1080'
    networks:
      - 'example-maildev-network'
    environment:
      MAILDEV_SMTP_PORT: '1025'
      MAILDEV_WEB_PORT: '1080'
    healthcheck:
      test: 'wget -O - http://localhost:${MAILDEV_WEB_PORT}${MAILDEV_BASE_PATHNAME}/healthz || exit 1'
      interval: '10s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
networks:
  example-maildev-network:
    driver: 'bridge'
```

New environment variable

```bash
# example-maildev-maildev (generated)
EXAMPLE_MAILDEV_MAILDEV_MAILDEV_SMTP_PORT=1025
EXAMPLE_MAILDEV_MAILDEV_MAILDEV_WEB_PORT=1080
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
