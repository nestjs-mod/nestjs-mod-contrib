/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { IResolverValidationOptions, IResolvers } from '@graphql-tools/utils';
import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { ApolloDriver } from '@nestjs/apollo';
import { Type } from '@nestjs/common';
import {
  AutoSchemaFileValue,
  BuildSchemaOptions,
  DefinitionsGeneratorOptions,
  Enhancer,
  GqlModuleOptions,
  GraphQLDriver,
  SubscriptionConfig,
} from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';
import { GRAPHQL_SCHEMA_FILE } from './graphql.constants';

export const defaultContextFunction = ({ req, res, payload, connection }: any): any => {
  if (connection) {
    return {
      req: { ...(req || {}), headers: payload?.context || connection?.context },
      res,
      payload,
      connection,
    };
  }

  return { req, res, payload, connection };
};

@ConfigModel()
export class GraphqlConfiguration<TDriver extends GraphQLDriver = any> implements GqlModuleOptions<TDriver> {
  /**
   * Path to mount GraphQL API
   */
  @ConfigModelProperty({
    description: 'Path to mount GraphQL API',
    default: '/graphql',
  })
  path?: string;

  /**
   * Type definitions
   */
  @ConfigModelProperty({
    description: 'Type definitions',
    default: [],
  })
  typeDefs?: string | string[];

  /**
   * Paths to files that contain GraphQL definitions
   */
  @ConfigModelProperty({
    description: 'Paths to files that contain GraphQL definitions',
  })
  typePaths?: string[];

  /**
   * GraphQL server adapter
   */
  @ConfigModelProperty({
    description: 'GraphQL server adapter',
    default: ApolloDriver,
  })
  driver?: Type<TDriver>;

  /**
   * An array of modules to scan when searching for resolvers
   */
  @ConfigModelProperty({
    description: 'An array of modules to scan when searching for resolvers',
  })
  include?: Function[];

  /**
   * Directive resolvers
   */
  @ConfigModelProperty({
    description: 'Directive resolvers',
  })
  directiveResolvers?: any;

  /**
   * Optional GraphQL schema (to be used or to be merged)
   */
  @ConfigModelProperty({
    description: 'Optional GraphQL schema (to be used or to be merged)',
  })
  schema?: GraphQLSchema;

  /**
   * Extra resolvers to be registered.
   */
  @ConfigModelProperty({
    description: 'Extra resolvers to be registered',
  })
  resolvers?: IResolvers | Array<IResolvers>;

  /**
   * TypeScript definitions generator options
   */
  @ConfigModelProperty({
    description: 'TypeScript definitions generator options',
  })
  definitions?: {
    path?: string;
    outputAs?: 'class' | 'interface';
  } & DefinitionsGeneratorOptions;

  /**
   * If enabled, GraphQL schema will be generated automatically
   */
  @ConfigModelProperty({
    description: 'If enabled, GraphQL schema will be generated automatically',
    default: GRAPHQL_SCHEMA_FILE,
  })
  autoSchemaFile?: AutoSchemaFileValue;

  /**
   * Sort the schema lexicographically
   */
  @ConfigModelProperty({
    description: 'Sort the schema lexicographically',
  })
  sortSchema?: boolean;

  /**
   * Options to be passed to the schema generator
   * Only applicable if "autoSchemaFile" = true
   */
  @ConfigModelProperty({
    description: 'Options to be passed to the schema generator, only applicable if "autoSchemaFile" = true',
  })
  buildSchemaOptions?: BuildSchemaOptions;

  /**
   * Prepends the global prefix to the url
   *
   * @see [faq/global-prefix](Global Prefix)
   */
  @ConfigModelProperty({
    description: 'Prepends the global prefix to the url @see [faq/global-prefix](Global Prefix)',
  })
  useGlobalPrefix?: boolean;

  /**
   * Enable/disable enhancers for @ResolveField()
   */
  @ConfigModelProperty({
    description: 'Enable/disable enhancers for @ResolveField()',
    default: ['interceptors', 'guards', 'filters'],
  })
  fieldResolverEnhancers?: Enhancer[];

  /**
   * Resolver validation options.
   */
  @ConfigModelProperty({
    description: 'Resolver validation options',
  })
  resolverValidationOptions?: IResolverValidationOptions;

  /**
   * Inherit missing resolvers from their interface types defined in the resolvers object.
   */
  @ConfigModelProperty({
    description: 'Inherit missing resolvers from their interface types defined in the resolvers object',
  })
  inheritResolversFromInterfaces?: boolean;

  /**
   * Function to be applied to the schema letting you register custom transformations.
   */
  @ConfigModelProperty({
    description: 'Function to be applied to the schema letting you register custom transformations',
  })
  transformSchema?: (schema: GraphQLSchema) => GraphQLSchema | Promise<GraphQLSchema>;

  /**
   * Apply `transformSchema` to the `autoSchemaFile`
   */
  @ConfigModelProperty({
    description: 'Apply `transformSchema` to the `autoSchemaFile`',
  })
  transformAutoSchemaFile?: boolean;

  /**
   * Context function
   */
  @ConfigModelProperty({
    description: 'Context function',
    default: defaultContextFunction,
  })
  context?: any;

  /**
   * Extra static metadata to be loaded into the specification
   */
  @ConfigModelProperty({
    description: 'Extra static metadata to be loaded into the specification',
  })
  metadata?: () => Promise<Record<string, any>>;

  /**
   * If enabled, "subscriptions-transport-ws" will be automatically registered.
   */
  @ConfigModelProperty({
    description: 'If enabled, "subscriptions-transport-ws" will be automatically registered',
    default: true,
  })
  installSubscriptionHandlers?: boolean;

  /**
   * Subscriptions configuration.
   */
  @ConfigModelProperty({
    description: 'Subscriptions configuration',
    default: {
      'graphql-ws': {
        path: '/graphql',
      },
    },
  })
  subscriptions?: SubscriptionConfig;

  /**
   * GraphQL playground options.
   */
  @ConfigModelProperty({
    description: 'GraphQL playground options',
    default: {
      settings: {
        // 'editor.theme': 'light', // use value dark if you want a dark theme in the playground
        'request.credentials': 'include',
      },
    },
  })
  playground?: boolean | any;

  /**
   * If enabled, will register a global interceptor that automatically maps
   * "HttpException" class instances to corresponding Apollo errors.
   * @default true
   */
  @ConfigModelProperty({
    description:
      'If enabled, will register a global interceptor that automatically maps "HttpException" class instances to corresponding Apollo errors',
  })
  autoTransformHttpErrors?: boolean;
}
