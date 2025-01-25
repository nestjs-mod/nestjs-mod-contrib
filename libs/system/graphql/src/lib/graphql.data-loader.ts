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
    const ctx: any = GqlExecutionContext.create(context).getContext();

    if (!ctx.InlineLoadersStorage) {
      ctx.InlineLoadersStorage = new Map();
    }

    if ('loader' in dataloader) {
      const dataloaderName = `Dataloader: ${dataloader.name}`;
      if (!ctx.InlineLoadersStorage.has(dataloaderName)) {
        ctx.InlineLoadersStorage.set(dataloaderName, dataloader.loader);
      }
      return ctx.InlineLoadersStorage.get(dataloaderName);
    } else {
      if (!ctx.InlineLoadersStorage.has(_class)) {
        ctx.InlineLoadersStorage.set(_class, new Map());
      }
      if (!ctx.InlineLoadersStorage.get(_class).has(_handler)) {
        ctx.InlineLoadersStorage.get(_class).set(_handler, dataloader);
      }
      return ctx.InlineLoadersStorage.get(_class).get(_handler);
    }
  }
);
