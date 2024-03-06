An approximate description of how to connect, an extended description with an example application will be next time (todo: right now I have a lot of work and don’t have time to arrange everything properly 😉)

```typescript
@Controller()
export class AppController {
  constructor(private readonly authorizerService: AuthorizerService) {}

  @Get('get-authorizer-client-id')
  @AllowEmptyUser()
  getAuthorizerClientID(@CurrentAuthorizerUser() authorizerUser: AuthorizerUser) {
    console.log(authorizerUser);
    return this.authorizerService.config.clientID;
  }
}

const { AppModule } = createNestModule({
  moduleName: 'AppModule',
  imports: [
    AuthorizerModule.forFeature({
      featureModuleName: 'AppModule',
    }),
  ],
  controllers: [AppController],
});

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
      DefaultNestApplicationInitializer.forRoot({
        staticConfiguration: {
          bufferLogs: true,
        },
      }),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    core: [
      AuthorizerModule.forRoot({
        staticConfiguration: {
          checkAccessValidator: async (
            authorizerUser?: AuthorizerUser,
            options?: CheckAccessOptions,
            ctx?: ExecutionContext
          ) => {
            if (
              typeof ctx?.getClass === 'function' &&
              typeof ctx?.getHandler === 'function' &&
              ctx?.getClass().name === 'TerminusHealthCheckController' &&
              ctx?.getHandler().name === 'check'
            ) {
              return true;
            }

            return defaultAuthorizerCheckAccessValidator(authorizerUser, options);
          },
        },
      }),
    ],
    feature: [AppModule.forRoot()],
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

New environment variable

```bash
SERVER_AUTHORIZER_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer?schema=public
SERVER_AUTHORIZER_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
SERVER_AUTHORIZER_INTERNAL_DATABASE_URL=postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer
SERVER_AUTHORIZER_INTERNAL_REDIS_URL=redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379
```

When launched in the infrastructure documentation generation mode, the module creates an `.env` file with a list of all required variables, as well as an example `example.env`, where you can enter example variable values.
