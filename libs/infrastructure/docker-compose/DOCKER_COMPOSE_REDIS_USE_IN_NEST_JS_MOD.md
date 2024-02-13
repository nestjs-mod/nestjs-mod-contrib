An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-cache-manager.

```typescript
import {
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  PACKAGE_JSON_FILE,
  ProjectUtils,
  bootstrapNestApplication,
} from '@nestjs-mod/common';
import { DOCKER_COMPOSE_FILE, DockerCompose, DockerComposeRedis } from '@nestjs-mod/docker-compose';
import { join } from 'path';
import { userFeatureName } from './app/app.constants';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-cache-manager');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(
            __dirname,
            '..',
            '..',
            '..',
            'apps/example-cache-manager',
            PACKAGE_JSON_FILE
          ),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'init' : 'listen',
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
      DockerComposeRedis.forRoot({ staticConfiguration: { featureName: userFeatureName } }),
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
  cache-manager-redis:
    image: 'bitnami/redis:7.2'
    container_name: 'cache-manager-redis'
    volumes:
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    ports:
      - '6379:6379'
    networks:
      - 'cache-manager-network'
    environment:
      REDIS_DATABASE: '0'
      REDIS_PASSWORD: 'redis_password'
      REDIS_DISABLE_COMMANDS: 'FLUSHDB,FLUSHALL'
      REDIS_IO_THREADS: 2
      REDIS_IO_THREADS_DO_READS: 'yes'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
networks:
  example-cache-manager-network:
    driver: bridge
volumes:
  example-cache-manager-volume:
    name: example-cache-manager-volume
```

Add database options to docker-compose file for application `docker-compose-example.yml` with fake credenionals

```yaml
# Do not modify this file, it is generated using the DockerCompose module included with NestJS-mod.
version: '3'
services:
  cache-manager-redis:
    image: 'bitnami/redis:7.2'
    container_name: 'cache-manager-redis'
    volumes:
      - 'cache-manager-redis-volume:/bitnami/redis/data'
    ports:
      - '6379:6379'
    networks:
      - 'cache-manager-network'
    environment:
      REDIS_DATABASE: 'value_for_redis_database'
      REDIS_PASSWORD: 'value_for_redis_password'
      REDIS_DISABLE_COMMANDS: 'value_for_redis_disable_commands'
      REDIS_IO_THREADS: 'value_for_redis_io_threads'
      REDIS_IO_THREADS_DO_READS: 'value_for_redis_io_threads_do_reads'
    healthcheck:
      test:
        - 'CMD-SHELL'
        - 'redis-cli ping | grep PONG'
      interval: '5s'
      timeout: '5s'
      retries: 5
    tty: true
    restart: 'always'
networks:
  example-cache-manager-network:
    driver: bridge
volumes:
  example-cache-manager-volume:
    name: example-cache-manager-volume
```

New environment variable

```bash
EXAMPLE_CACHE_MANAGER_CACHE_MANAGER_USER_REDIS_URL=redis://:redis_password@localhost:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
