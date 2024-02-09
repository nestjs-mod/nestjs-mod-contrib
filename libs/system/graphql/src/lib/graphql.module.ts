import { createNestModule, NestModuleCategory } from '@nestjs-mod/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfiguration } from './graphql.configuration';
import { GRAPHQL_MODULE_NAME } from './graphql.constants';
import { GraphqlDataLoaderInterceptor } from './graphql.data-loader';

export const { GraphqlModule } = createNestModule({
  moduleName: GRAPHQL_MODULE_NAME,
  moduleDescription:
    'GraphQL packages, providing an easy way to use GraphQL with the NestJS-mod, integrated: dataloader, included support for pipes, filters and interceptors in resolver fields, works with Fastify (Wrapper for https://docs.nestjs.com/graphql/quick-start)',
  moduleCategory: NestModuleCategory.system,
  configurationModel: GraphqlConfiguration,
  imports: ({ settingsModule }) => [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [settingsModule],
      inject: [GraphqlConfiguration],
      useFactory: (graphqlConfiguration: GraphqlConfiguration) => {
        return graphqlConfiguration;
      },
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphqlDataLoaderInterceptor,
    },
  ],
});
