An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma-flyway or https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-prisma.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose } from '@nestjs-mod/docker-compose';
import { join } from 'path';

export const flywayPrismaFeatureName = 'flyway-prisma';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-prisma-flyway');

bootstrapNestApplication({
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            appFolder
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
    ],
    infrastructure: [
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
    ],
  },
});
```

After connecting the module to the application and `npm run build` and starting generation of documentation through `npm run docs:infrastructure`, you will have new files and scripts to run.

New scripts mostly `package.json`

```json
{
  "scripts": {
    "_____docker-compose infra_____": "_____docker-compose infra_____",
    "docker-compose:start:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./apps/example-prisma-flyway/docker-compose.yml --compatibility up -d",
    "docker-compose:stop:example-prisma-flyway": "export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./apps/example-prisma-flyway/docker-compose.yml down"
  },
  "scriptsComments": {
    "docker-compose:start:example-prisma-flyway": [
      "Running the docker-compose infrastructure for example-prisma-flyway"
    ],
    "docker-compose:stop:example-prisma-flyway": [
      "Stopping the docker-compose infrastructure for example-prisma-flyway"
    ]
  }
}
```

Empty docker-compose file for application `docker-compose.yml` with real credenionals and add it to `.gitignore` file

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
```

Empty docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
```
