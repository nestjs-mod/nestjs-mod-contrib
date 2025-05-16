An example of using Authorizer, you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-authorizer/INFRASTRUCTURE.MD.

**Test urls**
```
// http://localhost:3000/api/sign-up/a1@email.com/A@@a12345678
// http://localhost:3000/api/sign-in/a1@email.com/A@@a12345678
// http://localhost:3000/api/profile/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGxvd2VkX3JvbGVzIjpbInVzZXIiXSwiYXVkIjoiYTJlZDA5ZTEtZmZkMS00YjQ3LWE1MjktZTUzYWU1NDVlZTY1IiwiZXhwIjoxNzQ2NzczODQ3LCJpYXQiOjE3NDY3NzIwNDcsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCIsImxvZ2luX21ldGhvZCI6ImJhc2ljX2F1dGgiLCJub25jZSI6IjdhNzRkOTNhLTNjZDItNDgxMi1hZjY2LTZlMTZiYzZlYjljZCIsInJvbGVzIjpbInVzZXIiXSwic2NvcGUiOlsib3BlbmlkIiwiZW1haWwiLCJwcm9maWxlIl0sInN1YiI6ImEzYjYyZTUwLTQ2Y2MtNDZlNC1iYWRiLTkyYWUwYzhmNGE4ZSIsInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4ifQ.KUVZ82-wI1V5OhFLF6xUp10b_T4947PMRpnvGlHVTm9A-EBHcl3OzXAxNl5pjbSLdHICVCpiG1zxDOlFoM1kHsTgeG7yBSc5CHFzlAGlPtgYW9wU6exQZ2sidifX3RGcD2nQ0yOaFv0YYURO7AHPP15CIvdsUPZ3016SwAM5JuGjqdriT-5aFHZFMkiHAdETYoGy2oyXQimMdyBxA1ciKKlykhLgEXTvgebqPguKEHj6Vxp3DEpNu3Y0Bm2K9Wog5dgci6rO8ojdsPoni_iyYVJIxdDhdBdax2824uVpgXDDueAKJ6nUQ9v50MlRSj6b5T3gjOETnar8U8bIH0hjZA
```

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
