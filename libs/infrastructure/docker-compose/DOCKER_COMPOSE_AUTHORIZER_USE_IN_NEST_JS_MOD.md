An approximate description of how to connect, an extended description with an example application will be next time (todo: right now I have a lot of work and don’t have time to arrange everything properly 😉)

```typescript
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
      DockerCompose.forRoot({
        configuration: {
          dockerComposeFileVersion: '3',
          dockerComposeFile: join(appFolder, DOCKER_COMPOSE_FILE),
        },
      }),
      DockerComposePostgreSQL.forFeature({
        featureModuleName: authorizerFeatureName,
      }),
      DockerComposeRedis.forRoot(),
      DockerComposeAuthorizer.forRoot({
        staticEnvironments: {
          redisUrl: '%SERVER_AUTHORIZER_INTERNAL_REDIS_URL%',
          databaseUrl: '%SERVER_AUTHORIZER_INTERNAL_DATABASE_URL%',
        },
        staticConfiguration: {
          featureName: authorizerFeatureName,
          organizationName: 'OrganizationName',
          dependsOnServiceNames: {
            'postgre-sql-migrations': 'service_completed_successfully',
            redis: 'service_healthy',
          },
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
  server-authorizer:
    image: "lakhansamani/authorizer:1.3.8"
    container_name: "server-authorizer"
    ports:
      - "8000:8080"
    networks:
      - "server-network"
    environment:
      REDIS_URL: "redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379"
      DATABASE_URL: "postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer"
      ADMIN_SECRET: "VfKSfPPljhHBXCEohnitursmgDxfAyiD"
      DATABASE_TYPE: "postgres"
      DATABASE_NAME: "authorizer"
      FEATURE_NAME: "authorizer"
      ORGANIZATION_NAME: "OrganizationName"
      DEPENDS_ON_SERVICE_NAMES: "[object Object]"
      IMAGE: "lakhansamani/authorizer:1.3.8"
      EXTERNAL_CLIENT_PORT: "8000"
      ENV: "production"
      PORT: "8080"
      COOKIE_NAME: "authorizer"
      RESET_PASSWORD_URL: "/reset-password"
      DISABLE_PLAYGROUND: "true"
      ROLES: "user,admin"
      DEFAULT_ROLES: "user"
      JWT_ROLE_CLAIM: "role"
      ORGANIZATION_LOGO: "Authorizer Logo"
      ACCESS_TOKEN_EXPIRY_TIME: "30m"
      COUCHBASE_BUCKET: "authorizer"
      COUCHBASE_BUCKET_RAM_QUOTA: "1000"
      COUCHBASE_SCOPE: "_default"
    tty: true
    restart: "always"
    depends_on:
      server-postgre-sql-migrations:
        condition: "service_completed_successfully"
      server-redis:
        condition: "service_healthy"
networks:
  server-network:
    driver: 'bridge'
```

New environment variable

```bash
SERVER_AUTHORIZER_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer?schema=public
SERVER_AUTHORIZER_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
SERVER_AUTHORIZER_INTERNAL_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer
SERVER_AUTHORIZER_INTERNAL_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
# server-authorizer (generated)
REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer
ADMIN_SECRET=VfKSfPPljhHBXCEohnitursmgDxfAyiD
DATABASE_TYPE=postgres
DATABASE_NAME=authorizer
FEATURE_NAME=authorizer
ORGANIZATION_NAME='OrganizationName'
IMAGE=lakhansamani/authorizer:1.3.8
EXTERNAL_CLIENT_PORT=8000
ENV=production
PORT=8080
COOKIE_NAME=authorizer
RESET_PASSWORD_URL=/reset-password
DISABLE_PLAYGROUND=true
ROLES=user,admin
DEFAULT_ROLES=user
JWT_ROLE_CLAIM=role
ORGANIZATION_LOGO='Authorizer Logo'
ACCESS_TOKEN_EXPIRY_TIME=30m
COUCHBASE_BUCKET=authorizer
COUCHBASE_BUCKET_RAM_QUOTA=1000
COUCHBASE_SCOPE=_default
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
