/* eslint-disable @typescript-eslint/no-explicit-any */
import { CallHandler, createParamDecorator, ExecutionContext, Injectable, NestInterceptor, Type } from '@nestjs/common';
import { APP_INTERCEPTOR, ContextIdFactory, ModuleRef } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Observable } from 'rxjs';
import { GraphqlError } from './graphql.errors';

/**
 * This interface will be used to generate the initial data loader.
 * The concrete implementation should be added as a provider to your module.
 */
export interface GraphqlDataLoader<ID, Type> {
  /**
   * Should return a new instance of dataloader each time
   */
  generateDataLoader(context?: ExecutionContext): DataLoader<ID, Type>;
}

/**
 * Context key where get loader function will be stored.
 * This class should be added to your module providers like so:
 * {
 *     provide: APP_INTERCEPTOR,
 *     useClass: DataLoaderInterceptor,
 * },
 */
const NEST_LOADER_CONTEXT_KEY = 'NEST_LOADER_CONTEXT_KEY';

@Injectable()
export class GraphqlDataLoaderInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}
  /**
   * @inheritdoc
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const graphqlExecutionContext = GqlExecutionContext.create(context);
    const ctx = graphqlExecutionContext.getContext();

    if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
      ctx[NEST_LOADER_CONTEXT_KEY] = {
        contextId: ContextIdFactory.create(),
        getLoader: (type: string): Promise<GraphqlDataLoader<any, any>> => {
          if (ctx[type] === undefined) {
            try {
              ctx[type] = (async () => {
                return (
                  await this.moduleRef.resolve<GraphqlDataLoader<any, any>>(
                    type,
                    ctx[NEST_LOADER_CONTEXT_KEY].contextId,
                    {
                      strict: false,
                    }
                  )
                ).generateDataLoader(context);
              })();
            } catch (e) {
              throw new GraphqlError(`The loader ${type} is not provided` + e);
            }
          }
          return ctx[type];
        },
      };
    }
    return next.handle();
  }
}

/**
 * The decorator to be used within your graphql method.
 */
export const Loader = createParamDecorator(
  async (data: Type<GraphqlDataLoader<any, any>>, context: ExecutionContext & { [key: string]: any }) => {
    const ctx: any = GqlExecutionContext.create(context).getContext();
    if (ctx[NEST_LOADER_CONTEXT_KEY] === undefined) {
      throw new GraphqlError(`
              You should provide interceptor ${GraphqlDataLoaderInterceptor.name} globally with ${APP_INTERCEPTOR}
            `);
    }
    return await ctx[NEST_LOADER_CONTEXT_KEY].getLoader(data);
  }
);

/**
 * Easy way to create a dataloader in a specific location, context only needs to be used to access global properties that are set in each request.
 * Added the ability to reuse simple dataloaders by a certain name.
 */
export const InlineLoadersStorage = new Map();
export const InlineLoader = createParamDecorator(
  (
    generateDataLoader: <ID, Type>(
      context?: ExecutionContext
    ) => DataLoader<ID, Type> | { name: string; loader: DataLoader<ID, Type> },
    context: ExecutionContext & { [key: string]: any }
  ) => {
    const _class = context.getClass();
    const _handler = context.getHandler();
    const dataloader = generateDataLoader(context);

    if ('loader' in dataloader) {
      const dataloaderName = `Dataloader: ${dataloader.name}`;
      if (!InlineLoadersStorage.has(dataloaderName)) {
        InlineLoadersStorage.set(dataloaderName, dataloader.loader);
      }
      return InlineLoadersStorage.get(dataloaderName);
    } else {
      if (!InlineLoadersStorage.has(_class)) {
        InlineLoadersStorage.set(_class, new Map());
      }
      if (!InlineLoadersStorage.get(_class).has(_handler)) {
        InlineLoadersStorage.get(_class).set(_handler, dataloader);
      }
      return InlineLoadersStorage.get(_class).get(_handler);
    }
  }
);
