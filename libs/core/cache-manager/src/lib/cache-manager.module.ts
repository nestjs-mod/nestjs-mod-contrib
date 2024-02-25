import {
  NestModuleCategory,
  createNestModule,
  getFeatureDotEnvPropertyNameFormatter
} from '@nestjs-mod/common';
import { Cache, createCache, memoryStore } from 'cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheManagerConfiguration } from './cache-manager.configuration';
import { CACHE_MANAGER_MODULE_NAME } from './cache-manager.constants';
import { getCacheManagerEnvironmentsLoaderToken } from './cache-manager.decorators';
import { CacheManagerEnvironments } from './cache-manager.environments';
import { CacheManagerService } from './cache-manager.service';
import { redisUrlParse } from './cache-manager.utils';


export const { CacheManagerModule } = createNestModule({
  moduleName: CACHE_MANAGER_MODULE_NAME,
  moduleDescription:
    'A cache module for nodejs that allows easy wrapping of functions in cache, tiered caches, and a consistent interface for NestJS-mod (Wrapper for https://www.npmjs.com/package/cache-manager)',
  moduleCategory: NestModuleCategory.core,
  environmentsModel: CacheManagerEnvironments,
  staticConfigurationModel: CacheManagerConfiguration,
  sharedProviders: [CacheManagerService],
  providers: (options) => [
    {
      // need for patch empty service
      provide: 'CacheManagerService_loader',
      useFactory: async (
        emptyCacheManagerService: CacheManagerService,
        cacheManagerEnvironments: CacheManagerEnvironments
      ) => {
        let cacheManagerService: Cache = createCache(memoryStore());
        if (options.staticConfiguration.type !== 'memory') {
          const options = redisUrlParse(cacheManagerEnvironments.redisUrl);
          const store = await redisStore({
            socket: {
              host: options.host,
              port: options.port,
            },
            ...(options.password ? { password: options.password } : {}),
          });

          cacheManagerService = createCache(store);
        }
        Object.setPrototypeOf(emptyCacheManagerService, cacheManagerService);
        Object.assign(emptyCacheManagerService, cacheManagerService);
      },
      inject: [
        CacheManagerService,
        CacheManagerEnvironments,
        // need for wait resolve env config
        getCacheManagerEnvironmentsLoaderToken(options.contextName),
      ],
    },
  ],
  wrapForRootAsync: (asyncModuleOptions) => {
    if (!asyncModuleOptions) {
      asyncModuleOptions = {};
    }
    if (asyncModuleOptions.staticConfiguration?.featureName) {
      const FomatterClass = getFeatureDotEnvPropertyNameFormatter(asyncModuleOptions.staticConfiguration.featureName);
      Object.assign(asyncModuleOptions, {
        environmentsOptions: {
          propertyNameFormatters: [new FomatterClass()],
          name: asyncModuleOptions.staticConfiguration?.featureName,
        },
      });
    }
    return { asyncModuleOptions };
  },
});
