An example of using Minio, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio and frontend on Angular here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-minio-angular.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
  isInfrastructureMode,
} from '@nestjs-mod/common';
import { join } from 'path';

import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeMinio } from '@nestjs-mod/docker-compose';

const userFeatureName = 'minio-user';
const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-minio');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
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
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
        },
      }),
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposeMinio.forRoot({
        staticConfiguration: {
          nginxPort: 1111,
          nginxFilesFolder: join(appFolder, 'ngnix'),
          featureName: userFeatureName,
        },
      }),
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
  example-minio-minio:
    image: 'bitnami/minio:2024.2.9'
    container_name: 'example-minio-minio'
    volumes:
      - 'example-minio-minio-volume:/bitnami/minio/data'
    ports:
      - '9000:9000'
      - '9001:9001'
    networks:
      - 'example-minio-network'
    environment:
      MINIO_ROOT_USER: 'minioadmin'
      MINIO_ROOT_PASSWORD: '6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'mc'
        - 'ready'
        - 'local'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
  example-minio-nginx:
    image: 'nginx:alpine'
    container_name: 'example-minio-nginx'
    volumes:
      - './ngnix/config:/etc/nginx/conf.d'
      - './ngnix/logs:/var/log/nginx/'
    ports:
      - '1111:1111'
    networks:
      - 'example-minio-network'
    tty: true
    restart: 'always'
    depends_on:
      example-minio-minio:
        condition: 'service_started'
networks:
  example-minio-network:
    driver: 'bridge'
volumes:
  example-minio-minio-volume:
    name: 'example-minio-minio-volume'
```

Add database options to docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
services:
  example-minio-minio:
    image: 'bitnami/minio:2024.2.9'
    container_name: 'example-minio-minio'
    volumes:
      - 'example-minio-minio-volume:/bitnami/minio/data'
    ports:
      - '9000:9000'
      - '9001:9001'
    networks:
      - 'example-minio-network'
    environment:
      MINIO_ROOT_USER: 'value_for_minio_root_user'
      MINIO_ROOT_PASSWORD: 'value_for_minio_root_password'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'mc'
        - 'ready'
        - 'local'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
  example-minio-nginx:
    image: 'nginx:alpine'
    container_name: 'example-minio-nginx'
    volumes:
      - './ngnix/config:/etc/nginx/conf.d'
      - './ngnix/logs:/var/log/nginx/'
    ports:
      - '1111:1111'
    networks:
      - 'example-minio-network'
    tty: true
    restart: 'always'
    depends_on:
      example-minio-minio:
        condition: 'service_started'
networks:
  example-minio-network:
    driver: 'bridge'
volumes:
  example-minio-minio-volume:
    name: 'example-minio-minio-volume'
```

New environment variable

```bash
EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_USER=minioadmin
EXAMPLE_MINIO_MINIO_USER_MINIO_ROOT_PASSWORD=6EcbcW66JsKvFrY2bZw6QGKjHhefca7Kgppq
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
