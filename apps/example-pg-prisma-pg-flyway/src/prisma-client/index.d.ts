
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PgFlywayPrismaUser
 * 
 */
export type PgFlywayPrismaUser = $Result.DefaultSelection<Prisma.$PgFlywayPrismaUserPayload>
/**
 * Model migrations_example_pg_prisma_pg_flyway
 * 
 */
export type migrations_example_pg_prisma_pg_flyway = $Result.DefaultSelection<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
/**
 * Model migrations_example_prisma_pg_flyway
 * 
 */
export type migrations_example_prisma_pg_flyway = $Result.DefaultSelection<Prisma.$migrations_example_prisma_pg_flywayPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PgFlywayPrismaUsers
 * const pgFlywayPrismaUsers = await prisma.pgFlywayPrismaUser.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PgFlywayPrismaUsers
   * const pgFlywayPrismaUsers = await prisma.pgFlywayPrismaUser.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.pgFlywayPrismaUser`: Exposes CRUD operations for the **PgFlywayPrismaUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PgFlywayPrismaUsers
    * const pgFlywayPrismaUsers = await prisma.pgFlywayPrismaUser.findMany()
    * ```
    */
  get pgFlywayPrismaUser(): Prisma.PgFlywayPrismaUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.migrations_example_pg_prisma_pg_flyway`: Exposes CRUD operations for the **migrations_example_pg_prisma_pg_flyway** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Migrations_example_pg_prisma_pg_flyways
    * const migrations_example_pg_prisma_pg_flyways = await prisma.migrations_example_pg_prisma_pg_flyway.findMany()
    * ```
    */
  get migrations_example_pg_prisma_pg_flyway(): Prisma.migrations_example_pg_prisma_pg_flywayDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.migrations_example_prisma_pg_flyway`: Exposes CRUD operations for the **migrations_example_prisma_pg_flyway** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Migrations_example_prisma_pg_flyways
    * const migrations_example_prisma_pg_flyways = await prisma.migrations_example_prisma_pg_flyway.findMany()
    * ```
    */
  get migrations_example_prisma_pg_flyway(): Prisma.migrations_example_prisma_pg_flywayDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends bigint
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends boolean, B2 extends boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PgFlywayPrismaUser: 'PgFlywayPrismaUser',
    migrations_example_pg_prisma_pg_flyway: 'migrations_example_pg_prisma_pg_flyway',
    migrations_example_prisma_pg_flyway: 'migrations_example_prisma_pg_flyway'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "pgFlywayPrismaUser" | "migrations_example_pg_prisma_pg_flyway" | "migrations_example_prisma_pg_flyway"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PgFlywayPrismaUser: {
        payload: Prisma.$PgFlywayPrismaUserPayload<ExtArgs>
        fields: Prisma.PgFlywayPrismaUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PgFlywayPrismaUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PgFlywayPrismaUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          findFirst: {
            args: Prisma.PgFlywayPrismaUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PgFlywayPrismaUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          findMany: {
            args: Prisma.PgFlywayPrismaUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>[]
          }
          create: {
            args: Prisma.PgFlywayPrismaUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          createMany: {
            args: Prisma.PgFlywayPrismaUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PgFlywayPrismaUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>[]
          }
          delete: {
            args: Prisma.PgFlywayPrismaUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          update: {
            args: Prisma.PgFlywayPrismaUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          deleteMany: {
            args: Prisma.PgFlywayPrismaUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PgFlywayPrismaUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PgFlywayPrismaUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>[]
          }
          upsert: {
            args: Prisma.PgFlywayPrismaUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PgFlywayPrismaUserPayload>
          }
          aggregate: {
            args: Prisma.PgFlywayPrismaUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePgFlywayPrismaUser>
          }
          groupBy: {
            args: Prisma.PgFlywayPrismaUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<PgFlywayPrismaUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.PgFlywayPrismaUserCountArgs<ExtArgs>
            result: $Utils.Optional<PgFlywayPrismaUserCountAggregateOutputType> | number
          }
        }
      }
      migrations_example_pg_prisma_pg_flyway: {
        payload: Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>
        fields: Prisma.migrations_example_pg_prisma_pg_flywayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          findFirst: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          findMany: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>[]
          }
          create: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          createMany: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>[]
          }
          delete: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          update: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          deleteMany: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>[]
          }
          upsert: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload>
          }
          aggregate: {
            args: Prisma.Migrations_example_pg_prisma_pg_flywayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMigrations_example_pg_prisma_pg_flyway>
          }
          groupBy: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayGroupByArgs<ExtArgs>
            result: $Utils.Optional<Migrations_example_pg_prisma_pg_flywayGroupByOutputType>[]
          }
          count: {
            args: Prisma.migrations_example_pg_prisma_pg_flywayCountArgs<ExtArgs>
            result: $Utils.Optional<Migrations_example_pg_prisma_pg_flywayCountAggregateOutputType> | number
          }
        }
      }
      migrations_example_prisma_pg_flyway: {
        payload: Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>
        fields: Prisma.migrations_example_prisma_pg_flywayFieldRefs
        operations: {
          findUnique: {
            args: Prisma.migrations_example_prisma_pg_flywayFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.migrations_example_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          findFirst: {
            args: Prisma.migrations_example_prisma_pg_flywayFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.migrations_example_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          findMany: {
            args: Prisma.migrations_example_prisma_pg_flywayFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>[]
          }
          create: {
            args: Prisma.migrations_example_prisma_pg_flywayCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          createMany: {
            args: Prisma.migrations_example_prisma_pg_flywayCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.migrations_example_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>[]
          }
          delete: {
            args: Prisma.migrations_example_prisma_pg_flywayDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          update: {
            args: Prisma.migrations_example_prisma_pg_flywayUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          deleteMany: {
            args: Prisma.migrations_example_prisma_pg_flywayDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.migrations_example_prisma_pg_flywayUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.migrations_example_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>[]
          }
          upsert: {
            args: Prisma.migrations_example_prisma_pg_flywayUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$migrations_example_prisma_pg_flywayPayload>
          }
          aggregate: {
            args: Prisma.Migrations_example_prisma_pg_flywayAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMigrations_example_prisma_pg_flyway>
          }
          groupBy: {
            args: Prisma.migrations_example_prisma_pg_flywayGroupByArgs<ExtArgs>
            result: $Utils.Optional<Migrations_example_prisma_pg_flywayGroupByOutputType>[]
          }
          count: {
            args: Prisma.migrations_example_prisma_pg_flywayCountArgs<ExtArgs>
            result: $Utils.Optional<Migrations_example_prisma_pg_flywayCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    pgFlywayPrismaUser?: PgFlywayPrismaUserOmit
    migrations_example_pg_prisma_pg_flyway?: migrations_example_pg_prisma_pg_flywayOmit
    migrations_example_prisma_pg_flyway?: migrations_example_prisma_pg_flywayOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model PgFlywayPrismaUser
   */

  export type AggregatePgFlywayPrismaUser = {
    _count: PgFlywayPrismaUserCountAggregateOutputType | null
    _min: PgFlywayPrismaUserMinAggregateOutputType | null
    _max: PgFlywayPrismaUserMaxAggregateOutputType | null
  }

  export type PgFlywayPrismaUserMinAggregateOutputType = {
    id: string | null
    externalUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PgFlywayPrismaUserMaxAggregateOutputType = {
    id: string | null
    externalUserId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PgFlywayPrismaUserCountAggregateOutputType = {
    id: number
    externalUserId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PgFlywayPrismaUserMinAggregateInputType = {
    id?: true
    externalUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PgFlywayPrismaUserMaxAggregateInputType = {
    id?: true
    externalUserId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PgFlywayPrismaUserCountAggregateInputType = {
    id?: true
    externalUserId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PgFlywayPrismaUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PgFlywayPrismaUser to aggregate.
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PgFlywayPrismaUsers to fetch.
     */
    orderBy?: PgFlywayPrismaUserOrderByWithRelationInput | PgFlywayPrismaUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PgFlywayPrismaUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PgFlywayPrismaUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PgFlywayPrismaUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PgFlywayPrismaUsers
    **/
    _count?: true | PgFlywayPrismaUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PgFlywayPrismaUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PgFlywayPrismaUserMaxAggregateInputType
  }

  export type GetPgFlywayPrismaUserAggregateType<T extends PgFlywayPrismaUserAggregateArgs> = {
        [P in keyof T & keyof AggregatePgFlywayPrismaUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePgFlywayPrismaUser[P]>
      : GetScalarType<T[P], AggregatePgFlywayPrismaUser[P]>
  }




  export type PgFlywayPrismaUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PgFlywayPrismaUserWhereInput
    orderBy?: PgFlywayPrismaUserOrderByWithAggregationInput | PgFlywayPrismaUserOrderByWithAggregationInput[]
    by: PgFlywayPrismaUserScalarFieldEnum[] | PgFlywayPrismaUserScalarFieldEnum
    having?: PgFlywayPrismaUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PgFlywayPrismaUserCountAggregateInputType | true
    _min?: PgFlywayPrismaUserMinAggregateInputType
    _max?: PgFlywayPrismaUserMaxAggregateInputType
  }

  export type PgFlywayPrismaUserGroupByOutputType = {
    id: string
    externalUserId: string
    createdAt: Date
    updatedAt: Date
    _count: PgFlywayPrismaUserCountAggregateOutputType | null
    _min: PgFlywayPrismaUserMinAggregateOutputType | null
    _max: PgFlywayPrismaUserMaxAggregateOutputType | null
  }

  type GetPgFlywayPrismaUserGroupByPayload<T extends PgFlywayPrismaUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PgFlywayPrismaUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PgFlywayPrismaUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PgFlywayPrismaUserGroupByOutputType[P]>
            : GetScalarType<T[P], PgFlywayPrismaUserGroupByOutputType[P]>
        }
      >
    >


  export type PgFlywayPrismaUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pgFlywayPrismaUser"]>

  export type PgFlywayPrismaUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pgFlywayPrismaUser"]>

  export type PgFlywayPrismaUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    externalUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pgFlywayPrismaUser"]>

  export type PgFlywayPrismaUserSelectScalar = {
    id?: boolean
    externalUserId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PgFlywayPrismaUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "externalUserId" | "createdAt" | "updatedAt", ExtArgs["result"]["pgFlywayPrismaUser"]>

  export type $PgFlywayPrismaUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PgFlywayPrismaUser"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      externalUserId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pgFlywayPrismaUser"]>
    composites: {}
  }

  type PgFlywayPrismaUserGetPayload<S extends boolean | null | undefined | PgFlywayPrismaUserDefaultArgs> = $Result.GetResult<Prisma.$PgFlywayPrismaUserPayload, S>

  type PgFlywayPrismaUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PgFlywayPrismaUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PgFlywayPrismaUserCountAggregateInputType | true
    }

  export interface PgFlywayPrismaUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PgFlywayPrismaUser'], meta: { name: 'PgFlywayPrismaUser' } }
    /**
     * Find zero or one PgFlywayPrismaUser that matches the filter.
     * @param {PgFlywayPrismaUserFindUniqueArgs} args - Arguments to find a PgFlywayPrismaUser
     * @example
     * // Get one PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PgFlywayPrismaUserFindUniqueArgs>(args: SelectSubset<T, PgFlywayPrismaUserFindUniqueArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PgFlywayPrismaUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PgFlywayPrismaUserFindUniqueOrThrowArgs} args - Arguments to find a PgFlywayPrismaUser
     * @example
     * // Get one PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PgFlywayPrismaUserFindUniqueOrThrowArgs>(args: SelectSubset<T, PgFlywayPrismaUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PgFlywayPrismaUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserFindFirstArgs} args - Arguments to find a PgFlywayPrismaUser
     * @example
     * // Get one PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PgFlywayPrismaUserFindFirstArgs>(args?: SelectSubset<T, PgFlywayPrismaUserFindFirstArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PgFlywayPrismaUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserFindFirstOrThrowArgs} args - Arguments to find a PgFlywayPrismaUser
     * @example
     * // Get one PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PgFlywayPrismaUserFindFirstOrThrowArgs>(args?: SelectSubset<T, PgFlywayPrismaUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PgFlywayPrismaUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PgFlywayPrismaUsers
     * const pgFlywayPrismaUsers = await prisma.pgFlywayPrismaUser.findMany()
     * 
     * // Get first 10 PgFlywayPrismaUsers
     * const pgFlywayPrismaUsers = await prisma.pgFlywayPrismaUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pgFlywayPrismaUserWithIdOnly = await prisma.pgFlywayPrismaUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PgFlywayPrismaUserFindManyArgs>(args?: SelectSubset<T, PgFlywayPrismaUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PgFlywayPrismaUser.
     * @param {PgFlywayPrismaUserCreateArgs} args - Arguments to create a PgFlywayPrismaUser.
     * @example
     * // Create one PgFlywayPrismaUser
     * const PgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.create({
     *   data: {
     *     // ... data to create a PgFlywayPrismaUser
     *   }
     * })
     * 
     */
    create<T extends PgFlywayPrismaUserCreateArgs>(args: SelectSubset<T, PgFlywayPrismaUserCreateArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PgFlywayPrismaUsers.
     * @param {PgFlywayPrismaUserCreateManyArgs} args - Arguments to create many PgFlywayPrismaUsers.
     * @example
     * // Create many PgFlywayPrismaUsers
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PgFlywayPrismaUserCreateManyArgs>(args?: SelectSubset<T, PgFlywayPrismaUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PgFlywayPrismaUsers and returns the data saved in the database.
     * @param {PgFlywayPrismaUserCreateManyAndReturnArgs} args - Arguments to create many PgFlywayPrismaUsers.
     * @example
     * // Create many PgFlywayPrismaUsers
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PgFlywayPrismaUsers and only return the `id`
     * const pgFlywayPrismaUserWithIdOnly = await prisma.pgFlywayPrismaUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PgFlywayPrismaUserCreateManyAndReturnArgs>(args?: SelectSubset<T, PgFlywayPrismaUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PgFlywayPrismaUser.
     * @param {PgFlywayPrismaUserDeleteArgs} args - Arguments to delete one PgFlywayPrismaUser.
     * @example
     * // Delete one PgFlywayPrismaUser
     * const PgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.delete({
     *   where: {
     *     // ... filter to delete one PgFlywayPrismaUser
     *   }
     * })
     * 
     */
    delete<T extends PgFlywayPrismaUserDeleteArgs>(args: SelectSubset<T, PgFlywayPrismaUserDeleteArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PgFlywayPrismaUser.
     * @param {PgFlywayPrismaUserUpdateArgs} args - Arguments to update one PgFlywayPrismaUser.
     * @example
     * // Update one PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PgFlywayPrismaUserUpdateArgs>(args: SelectSubset<T, PgFlywayPrismaUserUpdateArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PgFlywayPrismaUsers.
     * @param {PgFlywayPrismaUserDeleteManyArgs} args - Arguments to filter PgFlywayPrismaUsers to delete.
     * @example
     * // Delete a few PgFlywayPrismaUsers
     * const { count } = await prisma.pgFlywayPrismaUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PgFlywayPrismaUserDeleteManyArgs>(args?: SelectSubset<T, PgFlywayPrismaUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PgFlywayPrismaUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PgFlywayPrismaUsers
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PgFlywayPrismaUserUpdateManyArgs>(args: SelectSubset<T, PgFlywayPrismaUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PgFlywayPrismaUsers and returns the data updated in the database.
     * @param {PgFlywayPrismaUserUpdateManyAndReturnArgs} args - Arguments to update many PgFlywayPrismaUsers.
     * @example
     * // Update many PgFlywayPrismaUsers
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PgFlywayPrismaUsers and only return the `id`
     * const pgFlywayPrismaUserWithIdOnly = await prisma.pgFlywayPrismaUser.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PgFlywayPrismaUserUpdateManyAndReturnArgs>(args: SelectSubset<T, PgFlywayPrismaUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PgFlywayPrismaUser.
     * @param {PgFlywayPrismaUserUpsertArgs} args - Arguments to update or create a PgFlywayPrismaUser.
     * @example
     * // Update or create a PgFlywayPrismaUser
     * const pgFlywayPrismaUser = await prisma.pgFlywayPrismaUser.upsert({
     *   create: {
     *     // ... data to create a PgFlywayPrismaUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PgFlywayPrismaUser we want to update
     *   }
     * })
     */
    upsert<T extends PgFlywayPrismaUserUpsertArgs>(args: SelectSubset<T, PgFlywayPrismaUserUpsertArgs<ExtArgs>>): Prisma__PgFlywayPrismaUserClient<$Result.GetResult<Prisma.$PgFlywayPrismaUserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PgFlywayPrismaUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserCountArgs} args - Arguments to filter PgFlywayPrismaUsers to count.
     * @example
     * // Count the number of PgFlywayPrismaUsers
     * const count = await prisma.pgFlywayPrismaUser.count({
     *   where: {
     *     // ... the filter for the PgFlywayPrismaUsers we want to count
     *   }
     * })
    **/
    count<T extends PgFlywayPrismaUserCountArgs>(
      args?: Subset<T, PgFlywayPrismaUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PgFlywayPrismaUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PgFlywayPrismaUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PgFlywayPrismaUserAggregateArgs>(args: Subset<T, PgFlywayPrismaUserAggregateArgs>): Prisma.PrismaPromise<GetPgFlywayPrismaUserAggregateType<T>>

    /**
     * Group by PgFlywayPrismaUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PgFlywayPrismaUserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PgFlywayPrismaUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PgFlywayPrismaUserGroupByArgs['orderBy'] }
        : { orderBy?: PgFlywayPrismaUserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PgFlywayPrismaUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPgFlywayPrismaUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PgFlywayPrismaUser model
   */
  readonly fields: PgFlywayPrismaUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PgFlywayPrismaUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PgFlywayPrismaUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PgFlywayPrismaUser model
   */
  interface PgFlywayPrismaUserFieldRefs {
    readonly id: FieldRef<"PgFlywayPrismaUser", 'String'>
    readonly externalUserId: FieldRef<"PgFlywayPrismaUser", 'String'>
    readonly createdAt: FieldRef<"PgFlywayPrismaUser", 'DateTime'>
    readonly updatedAt: FieldRef<"PgFlywayPrismaUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PgFlywayPrismaUser findUnique
   */
  export type PgFlywayPrismaUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter, which PgFlywayPrismaUser to fetch.
     */
    where: PgFlywayPrismaUserWhereUniqueInput
  }

  /**
   * PgFlywayPrismaUser findUniqueOrThrow
   */
  export type PgFlywayPrismaUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter, which PgFlywayPrismaUser to fetch.
     */
    where: PgFlywayPrismaUserWhereUniqueInput
  }

  /**
   * PgFlywayPrismaUser findFirst
   */
  export type PgFlywayPrismaUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter, which PgFlywayPrismaUser to fetch.
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PgFlywayPrismaUsers to fetch.
     */
    orderBy?: PgFlywayPrismaUserOrderByWithRelationInput | PgFlywayPrismaUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PgFlywayPrismaUsers.
     */
    cursor?: PgFlywayPrismaUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PgFlywayPrismaUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PgFlywayPrismaUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PgFlywayPrismaUsers.
     */
    distinct?: PgFlywayPrismaUserScalarFieldEnum | PgFlywayPrismaUserScalarFieldEnum[]
  }

  /**
   * PgFlywayPrismaUser findFirstOrThrow
   */
  export type PgFlywayPrismaUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter, which PgFlywayPrismaUser to fetch.
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PgFlywayPrismaUsers to fetch.
     */
    orderBy?: PgFlywayPrismaUserOrderByWithRelationInput | PgFlywayPrismaUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PgFlywayPrismaUsers.
     */
    cursor?: PgFlywayPrismaUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PgFlywayPrismaUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PgFlywayPrismaUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PgFlywayPrismaUsers.
     */
    distinct?: PgFlywayPrismaUserScalarFieldEnum | PgFlywayPrismaUserScalarFieldEnum[]
  }

  /**
   * PgFlywayPrismaUser findMany
   */
  export type PgFlywayPrismaUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter, which PgFlywayPrismaUsers to fetch.
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PgFlywayPrismaUsers to fetch.
     */
    orderBy?: PgFlywayPrismaUserOrderByWithRelationInput | PgFlywayPrismaUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PgFlywayPrismaUsers.
     */
    cursor?: PgFlywayPrismaUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PgFlywayPrismaUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PgFlywayPrismaUsers.
     */
    skip?: number
    distinct?: PgFlywayPrismaUserScalarFieldEnum | PgFlywayPrismaUserScalarFieldEnum[]
  }

  /**
   * PgFlywayPrismaUser create
   */
  export type PgFlywayPrismaUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * The data needed to create a PgFlywayPrismaUser.
     */
    data: XOR<PgFlywayPrismaUserCreateInput, PgFlywayPrismaUserUncheckedCreateInput>
  }

  /**
   * PgFlywayPrismaUser createMany
   */
  export type PgFlywayPrismaUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PgFlywayPrismaUsers.
     */
    data: PgFlywayPrismaUserCreateManyInput | PgFlywayPrismaUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PgFlywayPrismaUser createManyAndReturn
   */
  export type PgFlywayPrismaUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * The data used to create many PgFlywayPrismaUsers.
     */
    data: PgFlywayPrismaUserCreateManyInput | PgFlywayPrismaUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PgFlywayPrismaUser update
   */
  export type PgFlywayPrismaUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * The data needed to update a PgFlywayPrismaUser.
     */
    data: XOR<PgFlywayPrismaUserUpdateInput, PgFlywayPrismaUserUncheckedUpdateInput>
    /**
     * Choose, which PgFlywayPrismaUser to update.
     */
    where: PgFlywayPrismaUserWhereUniqueInput
  }

  /**
   * PgFlywayPrismaUser updateMany
   */
  export type PgFlywayPrismaUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PgFlywayPrismaUsers.
     */
    data: XOR<PgFlywayPrismaUserUpdateManyMutationInput, PgFlywayPrismaUserUncheckedUpdateManyInput>
    /**
     * Filter which PgFlywayPrismaUsers to update
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * Limit how many PgFlywayPrismaUsers to update.
     */
    limit?: number
  }

  /**
   * PgFlywayPrismaUser updateManyAndReturn
   */
  export type PgFlywayPrismaUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * The data used to update PgFlywayPrismaUsers.
     */
    data: XOR<PgFlywayPrismaUserUpdateManyMutationInput, PgFlywayPrismaUserUncheckedUpdateManyInput>
    /**
     * Filter which PgFlywayPrismaUsers to update
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * Limit how many PgFlywayPrismaUsers to update.
     */
    limit?: number
  }

  /**
   * PgFlywayPrismaUser upsert
   */
  export type PgFlywayPrismaUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * The filter to search for the PgFlywayPrismaUser to update in case it exists.
     */
    where: PgFlywayPrismaUserWhereUniqueInput
    /**
     * In case the PgFlywayPrismaUser found by the `where` argument doesn't exist, create a new PgFlywayPrismaUser with this data.
     */
    create: XOR<PgFlywayPrismaUserCreateInput, PgFlywayPrismaUserUncheckedCreateInput>
    /**
     * In case the PgFlywayPrismaUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PgFlywayPrismaUserUpdateInput, PgFlywayPrismaUserUncheckedUpdateInput>
  }

  /**
   * PgFlywayPrismaUser delete
   */
  export type PgFlywayPrismaUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
    /**
     * Filter which PgFlywayPrismaUser to delete.
     */
    where: PgFlywayPrismaUserWhereUniqueInput
  }

  /**
   * PgFlywayPrismaUser deleteMany
   */
  export type PgFlywayPrismaUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PgFlywayPrismaUsers to delete
     */
    where?: PgFlywayPrismaUserWhereInput
    /**
     * Limit how many PgFlywayPrismaUsers to delete.
     */
    limit?: number
  }

  /**
   * PgFlywayPrismaUser without action
   */
  export type PgFlywayPrismaUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PgFlywayPrismaUser
     */
    select?: PgFlywayPrismaUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PgFlywayPrismaUser
     */
    omit?: PgFlywayPrismaUserOmit<ExtArgs> | null
  }


  /**
   * Model migrations_example_pg_prisma_pg_flyway
   */

  export type AggregateMigrations_example_pg_prisma_pg_flyway = {
    _count: Migrations_example_pg_prisma_pg_flywayCountAggregateOutputType | null
    _avg: Migrations_example_pg_prisma_pg_flywayAvgAggregateOutputType | null
    _sum: Migrations_example_pg_prisma_pg_flywaySumAggregateOutputType | null
    _min: Migrations_example_pg_prisma_pg_flywayMinAggregateOutputType | null
    _max: Migrations_example_pg_prisma_pg_flywayMaxAggregateOutputType | null
  }

  export type Migrations_example_pg_prisma_pg_flywayAvgAggregateOutputType = {
    installed_rank: number | null
    checksum: number | null
    execution_time: number | null
  }

  export type Migrations_example_pg_prisma_pg_flywaySumAggregateOutputType = {
    installed_rank: number | null
    checksum: number | null
    execution_time: number | null
  }

  export type Migrations_example_pg_prisma_pg_flywayMinAggregateOutputType = {
    installed_rank: number | null
    version: string | null
    description: string | null
    type: string | null
    script: string | null
    checksum: number | null
    installed_by: string | null
    installed_on: Date | null
    execution_time: number | null
    success: boolean | null
  }

  export type Migrations_example_pg_prisma_pg_flywayMaxAggregateOutputType = {
    installed_rank: number | null
    version: string | null
    description: string | null
    type: string | null
    script: string | null
    checksum: number | null
    installed_by: string | null
    installed_on: Date | null
    execution_time: number | null
    success: boolean | null
  }

  export type Migrations_example_pg_prisma_pg_flywayCountAggregateOutputType = {
    installed_rank: number
    version: number
    description: number
    type: number
    script: number
    checksum: number
    installed_by: number
    installed_on: number
    execution_time: number
    success: number
    _all: number
  }


  export type Migrations_example_pg_prisma_pg_flywayAvgAggregateInputType = {
    installed_rank?: true
    checksum?: true
    execution_time?: true
  }

  export type Migrations_example_pg_prisma_pg_flywaySumAggregateInputType = {
    installed_rank?: true
    checksum?: true
    execution_time?: true
  }

  export type Migrations_example_pg_prisma_pg_flywayMinAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
  }

  export type Migrations_example_pg_prisma_pg_flywayMaxAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
  }

  export type Migrations_example_pg_prisma_pg_flywayCountAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
    _all?: true
  }

  export type Migrations_example_pg_prisma_pg_flywayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations_example_pg_prisma_pg_flyway to aggregate.
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_pg_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput | migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_pg_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_pg_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned migrations_example_pg_prisma_pg_flyways
    **/
    _count?: true | Migrations_example_pg_prisma_pg_flywayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Migrations_example_pg_prisma_pg_flywayAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Migrations_example_pg_prisma_pg_flywaySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Migrations_example_pg_prisma_pg_flywayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Migrations_example_pg_prisma_pg_flywayMaxAggregateInputType
  }

  export type GetMigrations_example_pg_prisma_pg_flywayAggregateType<T extends Migrations_example_pg_prisma_pg_flywayAggregateArgs> = {
        [P in keyof T & keyof AggregateMigrations_example_pg_prisma_pg_flyway]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMigrations_example_pg_prisma_pg_flyway[P]>
      : GetScalarType<T[P], AggregateMigrations_example_pg_prisma_pg_flyway[P]>
  }




  export type migrations_example_pg_prisma_pg_flywayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    orderBy?: migrations_example_pg_prisma_pg_flywayOrderByWithAggregationInput | migrations_example_pg_prisma_pg_flywayOrderByWithAggregationInput[]
    by: Migrations_example_pg_prisma_pg_flywayScalarFieldEnum[] | Migrations_example_pg_prisma_pg_flywayScalarFieldEnum
    having?: migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Migrations_example_pg_prisma_pg_flywayCountAggregateInputType | true
    _avg?: Migrations_example_pg_prisma_pg_flywayAvgAggregateInputType
    _sum?: Migrations_example_pg_prisma_pg_flywaySumAggregateInputType
    _min?: Migrations_example_pg_prisma_pg_flywayMinAggregateInputType
    _max?: Migrations_example_pg_prisma_pg_flywayMaxAggregateInputType
  }

  export type Migrations_example_pg_prisma_pg_flywayGroupByOutputType = {
    installed_rank: number
    version: string | null
    description: string
    type: string
    script: string
    checksum: number | null
    installed_by: string
    installed_on: Date
    execution_time: number
    success: boolean
    _count: Migrations_example_pg_prisma_pg_flywayCountAggregateOutputType | null
    _avg: Migrations_example_pg_prisma_pg_flywayAvgAggregateOutputType | null
    _sum: Migrations_example_pg_prisma_pg_flywaySumAggregateOutputType | null
    _min: Migrations_example_pg_prisma_pg_flywayMinAggregateOutputType | null
    _max: Migrations_example_pg_prisma_pg_flywayMaxAggregateOutputType | null
  }

  type GetMigrations_example_pg_prisma_pg_flywayGroupByPayload<T extends migrations_example_pg_prisma_pg_flywayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Migrations_example_pg_prisma_pg_flywayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Migrations_example_pg_prisma_pg_flywayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Migrations_example_pg_prisma_pg_flywayGroupByOutputType[P]>
            : GetScalarType<T[P], Migrations_example_pg_prisma_pg_flywayGroupByOutputType[P]>
        }
      >
    >


  export type migrations_example_pg_prisma_pg_flywaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_pg_prisma_pg_flyway"]>

  export type migrations_example_pg_prisma_pg_flywaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_pg_prisma_pg_flyway"]>

  export type migrations_example_pg_prisma_pg_flywaySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_pg_prisma_pg_flyway"]>

  export type migrations_example_pg_prisma_pg_flywaySelectScalar = {
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }

  export type migrations_example_pg_prisma_pg_flywayOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"installed_rank" | "version" | "description" | "type" | "script" | "checksum" | "installed_by" | "installed_on" | "execution_time" | "success", ExtArgs["result"]["migrations_example_pg_prisma_pg_flyway"]>

  export type $migrations_example_pg_prisma_pg_flywayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "migrations_example_pg_prisma_pg_flyway"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      installed_rank: number
      version: string | null
      description: string
      type: string
      script: string
      checksum: number | null
      installed_by: string
      installed_on: Date
      execution_time: number
      success: boolean
    }, ExtArgs["result"]["migrations_example_pg_prisma_pg_flyway"]>
    composites: {}
  }

  type migrations_example_pg_prisma_pg_flywayGetPayload<S extends boolean | null | undefined | migrations_example_pg_prisma_pg_flywayDefaultArgs> = $Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload, S>

  type migrations_example_pg_prisma_pg_flywayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<migrations_example_pg_prisma_pg_flywayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Migrations_example_pg_prisma_pg_flywayCountAggregateInputType | true
    }

  export interface migrations_example_pg_prisma_pg_flywayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['migrations_example_pg_prisma_pg_flyway'], meta: { name: 'migrations_example_pg_prisma_pg_flyway' } }
    /**
     * Find zero or one Migrations_example_pg_prisma_pg_flyway that matches the filter.
     * @param {migrations_example_pg_prisma_pg_flywayFindUniqueArgs} args - Arguments to find a Migrations_example_pg_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends migrations_example_pg_prisma_pg_flywayFindUniqueArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayFindUniqueArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Migrations_example_pg_prisma_pg_flyway that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {migrations_example_pg_prisma_pg_flywayFindUniqueOrThrowArgs} args - Arguments to find a Migrations_example_pg_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends migrations_example_pg_prisma_pg_flywayFindUniqueOrThrowArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations_example_pg_prisma_pg_flyway that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayFindFirstArgs} args - Arguments to find a Migrations_example_pg_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends migrations_example_pg_prisma_pg_flywayFindFirstArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayFindFirstArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations_example_pg_prisma_pg_flyway that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayFindFirstOrThrowArgs} args - Arguments to find a Migrations_example_pg_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends migrations_example_pg_prisma_pg_flywayFindFirstOrThrowArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Migrations_example_pg_prisma_pg_flyways that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyways = await prisma.migrations_example_pg_prisma_pg_flyway.findMany()
     * 
     * // Get first 10 Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyways = await prisma.migrations_example_pg_prisma_pg_flyway.findMany({ take: 10 })
     * 
     * // Only select the `installed_rank`
     * const migrations_example_pg_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_pg_prisma_pg_flyway.findMany({ select: { installed_rank: true } })
     * 
     */
    findMany<T extends migrations_example_pg_prisma_pg_flywayFindManyArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Migrations_example_pg_prisma_pg_flyway.
     * @param {migrations_example_pg_prisma_pg_flywayCreateArgs} args - Arguments to create a Migrations_example_pg_prisma_pg_flyway.
     * @example
     * // Create one Migrations_example_pg_prisma_pg_flyway
     * const Migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.create({
     *   data: {
     *     // ... data to create a Migrations_example_pg_prisma_pg_flyway
     *   }
     * })
     * 
     */
    create<T extends migrations_example_pg_prisma_pg_flywayCreateArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayCreateArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Migrations_example_pg_prisma_pg_flyways.
     * @param {migrations_example_pg_prisma_pg_flywayCreateManyArgs} args - Arguments to create many Migrations_example_pg_prisma_pg_flyways.
     * @example
     * // Create many Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends migrations_example_pg_prisma_pg_flywayCreateManyArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Migrations_example_pg_prisma_pg_flyways and returns the data saved in the database.
     * @param {migrations_example_pg_prisma_pg_flywayCreateManyAndReturnArgs} args - Arguments to create many Migrations_example_pg_prisma_pg_flyways.
     * @example
     * // Create many Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Migrations_example_pg_prisma_pg_flyways and only return the `installed_rank`
     * const migrations_example_pg_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_pg_prisma_pg_flyway.createManyAndReturn({
     *   select: { installed_rank: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends migrations_example_pg_prisma_pg_flywayCreateManyAndReturnArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Migrations_example_pg_prisma_pg_flyway.
     * @param {migrations_example_pg_prisma_pg_flywayDeleteArgs} args - Arguments to delete one Migrations_example_pg_prisma_pg_flyway.
     * @example
     * // Delete one Migrations_example_pg_prisma_pg_flyway
     * const Migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.delete({
     *   where: {
     *     // ... filter to delete one Migrations_example_pg_prisma_pg_flyway
     *   }
     * })
     * 
     */
    delete<T extends migrations_example_pg_prisma_pg_flywayDeleteArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayDeleteArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Migrations_example_pg_prisma_pg_flyway.
     * @param {migrations_example_pg_prisma_pg_flywayUpdateArgs} args - Arguments to update one Migrations_example_pg_prisma_pg_flyway.
     * @example
     * // Update one Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends migrations_example_pg_prisma_pg_flywayUpdateArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayUpdateArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Migrations_example_pg_prisma_pg_flyways.
     * @param {migrations_example_pg_prisma_pg_flywayDeleteManyArgs} args - Arguments to filter Migrations_example_pg_prisma_pg_flyways to delete.
     * @example
     * // Delete a few Migrations_example_pg_prisma_pg_flyways
     * const { count } = await prisma.migrations_example_pg_prisma_pg_flyway.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends migrations_example_pg_prisma_pg_flywayDeleteManyArgs>(args?: SelectSubset<T, migrations_example_pg_prisma_pg_flywayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations_example_pg_prisma_pg_flyways.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends migrations_example_pg_prisma_pg_flywayUpdateManyArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations_example_pg_prisma_pg_flyways and returns the data updated in the database.
     * @param {migrations_example_pg_prisma_pg_flywayUpdateManyAndReturnArgs} args - Arguments to update many Migrations_example_pg_prisma_pg_flyways.
     * @example
     * // Update many Migrations_example_pg_prisma_pg_flyways
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Migrations_example_pg_prisma_pg_flyways and only return the `installed_rank`
     * const migrations_example_pg_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_pg_prisma_pg_flyway.updateManyAndReturn({
     *   select: { installed_rank: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends migrations_example_pg_prisma_pg_flywayUpdateManyAndReturnArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Migrations_example_pg_prisma_pg_flyway.
     * @param {migrations_example_pg_prisma_pg_flywayUpsertArgs} args - Arguments to update or create a Migrations_example_pg_prisma_pg_flyway.
     * @example
     * // Update or create a Migrations_example_pg_prisma_pg_flyway
     * const migrations_example_pg_prisma_pg_flyway = await prisma.migrations_example_pg_prisma_pg_flyway.upsert({
     *   create: {
     *     // ... data to create a Migrations_example_pg_prisma_pg_flyway
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Migrations_example_pg_prisma_pg_flyway we want to update
     *   }
     * })
     */
    upsert<T extends migrations_example_pg_prisma_pg_flywayUpsertArgs>(args: SelectSubset<T, migrations_example_pg_prisma_pg_flywayUpsertArgs<ExtArgs>>): Prisma__migrations_example_pg_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_pg_prisma_pg_flywayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Migrations_example_pg_prisma_pg_flyways.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayCountArgs} args - Arguments to filter Migrations_example_pg_prisma_pg_flyways to count.
     * @example
     * // Count the number of Migrations_example_pg_prisma_pg_flyways
     * const count = await prisma.migrations_example_pg_prisma_pg_flyway.count({
     *   where: {
     *     // ... the filter for the Migrations_example_pg_prisma_pg_flyways we want to count
     *   }
     * })
    **/
    count<T extends migrations_example_pg_prisma_pg_flywayCountArgs>(
      args?: Subset<T, migrations_example_pg_prisma_pg_flywayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Migrations_example_pg_prisma_pg_flywayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Migrations_example_pg_prisma_pg_flyway.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Migrations_example_pg_prisma_pg_flywayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Migrations_example_pg_prisma_pg_flywayAggregateArgs>(args: Subset<T, Migrations_example_pg_prisma_pg_flywayAggregateArgs>): Prisma.PrismaPromise<GetMigrations_example_pg_prisma_pg_flywayAggregateType<T>>

    /**
     * Group by Migrations_example_pg_prisma_pg_flyway.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_pg_prisma_pg_flywayGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends migrations_example_pg_prisma_pg_flywayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: migrations_example_pg_prisma_pg_flywayGroupByArgs['orderBy'] }
        : { orderBy?: migrations_example_pg_prisma_pg_flywayGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, migrations_example_pg_prisma_pg_flywayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMigrations_example_pg_prisma_pg_flywayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the migrations_example_pg_prisma_pg_flyway model
   */
  readonly fields: migrations_example_pg_prisma_pg_flywayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for migrations_example_pg_prisma_pg_flyway.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__migrations_example_pg_prisma_pg_flywayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the migrations_example_pg_prisma_pg_flyway model
   */
  interface migrations_example_pg_prisma_pg_flywayFieldRefs {
    readonly installed_rank: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'Int'>
    readonly version: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'String'>
    readonly description: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'String'>
    readonly type: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'String'>
    readonly script: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'String'>
    readonly checksum: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'Int'>
    readonly installed_by: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'String'>
    readonly installed_on: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'DateTime'>
    readonly execution_time: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'Int'>
    readonly success: FieldRef<"migrations_example_pg_prisma_pg_flyway", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * migrations_example_pg_prisma_pg_flyway findUnique
   */
  export type migrations_example_pg_prisma_pg_flywayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_pg_prisma_pg_flyway to fetch.
     */
    where: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_pg_prisma_pg_flyway findUniqueOrThrow
   */
  export type migrations_example_pg_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_pg_prisma_pg_flyway to fetch.
     */
    where: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_pg_prisma_pg_flyway findFirst
   */
  export type migrations_example_pg_prisma_pg_flywayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_pg_prisma_pg_flyway to fetch.
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_pg_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput | migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations_example_pg_prisma_pg_flyways.
     */
    cursor?: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_pg_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_pg_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations_example_pg_prisma_pg_flyways.
     */
    distinct?: Migrations_example_pg_prisma_pg_flywayScalarFieldEnum | Migrations_example_pg_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_pg_prisma_pg_flyway findFirstOrThrow
   */
  export type migrations_example_pg_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_pg_prisma_pg_flyway to fetch.
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_pg_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput | migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations_example_pg_prisma_pg_flyways.
     */
    cursor?: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_pg_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_pg_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations_example_pg_prisma_pg_flyways.
     */
    distinct?: Migrations_example_pg_prisma_pg_flywayScalarFieldEnum | Migrations_example_pg_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_pg_prisma_pg_flyway findMany
   */
  export type migrations_example_pg_prisma_pg_flywayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_pg_prisma_pg_flyways to fetch.
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_pg_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput | migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing migrations_example_pg_prisma_pg_flyways.
     */
    cursor?: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_pg_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_pg_prisma_pg_flyways.
     */
    skip?: number
    distinct?: Migrations_example_pg_prisma_pg_flywayScalarFieldEnum | Migrations_example_pg_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_pg_prisma_pg_flyway create
   */
  export type migrations_example_pg_prisma_pg_flywayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data needed to create a migrations_example_pg_prisma_pg_flyway.
     */
    data: XOR<migrations_example_pg_prisma_pg_flywayCreateInput, migrations_example_pg_prisma_pg_flywayUncheckedCreateInput>
  }

  /**
   * migrations_example_pg_prisma_pg_flyway createMany
   */
  export type migrations_example_pg_prisma_pg_flywayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many migrations_example_pg_prisma_pg_flyways.
     */
    data: migrations_example_pg_prisma_pg_flywayCreateManyInput | migrations_example_pg_prisma_pg_flywayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations_example_pg_prisma_pg_flyway createManyAndReturn
   */
  export type migrations_example_pg_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data used to create many migrations_example_pg_prisma_pg_flyways.
     */
    data: migrations_example_pg_prisma_pg_flywayCreateManyInput | migrations_example_pg_prisma_pg_flywayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations_example_pg_prisma_pg_flyway update
   */
  export type migrations_example_pg_prisma_pg_flywayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data needed to update a migrations_example_pg_prisma_pg_flyway.
     */
    data: XOR<migrations_example_pg_prisma_pg_flywayUpdateInput, migrations_example_pg_prisma_pg_flywayUncheckedUpdateInput>
    /**
     * Choose, which migrations_example_pg_prisma_pg_flyway to update.
     */
    where: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_pg_prisma_pg_flyway updateMany
   */
  export type migrations_example_pg_prisma_pg_flywayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update migrations_example_pg_prisma_pg_flyways.
     */
    data: XOR<migrations_example_pg_prisma_pg_flywayUpdateManyMutationInput, migrations_example_pg_prisma_pg_flywayUncheckedUpdateManyInput>
    /**
     * Filter which migrations_example_pg_prisma_pg_flyways to update
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_pg_prisma_pg_flyways to update.
     */
    limit?: number
  }

  /**
   * migrations_example_pg_prisma_pg_flyway updateManyAndReturn
   */
  export type migrations_example_pg_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data used to update migrations_example_pg_prisma_pg_flyways.
     */
    data: XOR<migrations_example_pg_prisma_pg_flywayUpdateManyMutationInput, migrations_example_pg_prisma_pg_flywayUncheckedUpdateManyInput>
    /**
     * Filter which migrations_example_pg_prisma_pg_flyways to update
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_pg_prisma_pg_flyways to update.
     */
    limit?: number
  }

  /**
   * migrations_example_pg_prisma_pg_flyway upsert
   */
  export type migrations_example_pg_prisma_pg_flywayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The filter to search for the migrations_example_pg_prisma_pg_flyway to update in case it exists.
     */
    where: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
    /**
     * In case the migrations_example_pg_prisma_pg_flyway found by the `where` argument doesn't exist, create a new migrations_example_pg_prisma_pg_flyway with this data.
     */
    create: XOR<migrations_example_pg_prisma_pg_flywayCreateInput, migrations_example_pg_prisma_pg_flywayUncheckedCreateInput>
    /**
     * In case the migrations_example_pg_prisma_pg_flyway was found with the provided `where` argument, update it with this data.
     */
    update: XOR<migrations_example_pg_prisma_pg_flywayUpdateInput, migrations_example_pg_prisma_pg_flywayUncheckedUpdateInput>
  }

  /**
   * migrations_example_pg_prisma_pg_flyway delete
   */
  export type migrations_example_pg_prisma_pg_flywayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter which migrations_example_pg_prisma_pg_flyway to delete.
     */
    where: migrations_example_pg_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_pg_prisma_pg_flyway deleteMany
   */
  export type migrations_example_pg_prisma_pg_flywayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations_example_pg_prisma_pg_flyways to delete
     */
    where?: migrations_example_pg_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_pg_prisma_pg_flyways to delete.
     */
    limit?: number
  }

  /**
   * migrations_example_pg_prisma_pg_flyway without action
   */
  export type migrations_example_pg_prisma_pg_flywayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_pg_prisma_pg_flyway
     */
    select?: migrations_example_pg_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_pg_prisma_pg_flyway
     */
    omit?: migrations_example_pg_prisma_pg_flywayOmit<ExtArgs> | null
  }


  /**
   * Model migrations_example_prisma_pg_flyway
   */

  export type AggregateMigrations_example_prisma_pg_flyway = {
    _count: Migrations_example_prisma_pg_flywayCountAggregateOutputType | null
    _avg: Migrations_example_prisma_pg_flywayAvgAggregateOutputType | null
    _sum: Migrations_example_prisma_pg_flywaySumAggregateOutputType | null
    _min: Migrations_example_prisma_pg_flywayMinAggregateOutputType | null
    _max: Migrations_example_prisma_pg_flywayMaxAggregateOutputType | null
  }

  export type Migrations_example_prisma_pg_flywayAvgAggregateOutputType = {
    installed_rank: number | null
    checksum: number | null
    execution_time: number | null
  }

  export type Migrations_example_prisma_pg_flywaySumAggregateOutputType = {
    installed_rank: number | null
    checksum: number | null
    execution_time: number | null
  }

  export type Migrations_example_prisma_pg_flywayMinAggregateOutputType = {
    installed_rank: number | null
    version: string | null
    description: string | null
    type: string | null
    script: string | null
    checksum: number | null
    installed_by: string | null
    installed_on: Date | null
    execution_time: number | null
    success: boolean | null
  }

  export type Migrations_example_prisma_pg_flywayMaxAggregateOutputType = {
    installed_rank: number | null
    version: string | null
    description: string | null
    type: string | null
    script: string | null
    checksum: number | null
    installed_by: string | null
    installed_on: Date | null
    execution_time: number | null
    success: boolean | null
  }

  export type Migrations_example_prisma_pg_flywayCountAggregateOutputType = {
    installed_rank: number
    version: number
    description: number
    type: number
    script: number
    checksum: number
    installed_by: number
    installed_on: number
    execution_time: number
    success: number
    _all: number
  }


  export type Migrations_example_prisma_pg_flywayAvgAggregateInputType = {
    installed_rank?: true
    checksum?: true
    execution_time?: true
  }

  export type Migrations_example_prisma_pg_flywaySumAggregateInputType = {
    installed_rank?: true
    checksum?: true
    execution_time?: true
  }

  export type Migrations_example_prisma_pg_flywayMinAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
  }

  export type Migrations_example_prisma_pg_flywayMaxAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
  }

  export type Migrations_example_prisma_pg_flywayCountAggregateInputType = {
    installed_rank?: true
    version?: true
    description?: true
    type?: true
    script?: true
    checksum?: true
    installed_by?: true
    installed_on?: true
    execution_time?: true
    success?: true
    _all?: true
  }

  export type Migrations_example_prisma_pg_flywayAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations_example_prisma_pg_flyway to aggregate.
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_prisma_pg_flywayOrderByWithRelationInput | migrations_example_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: migrations_example_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned migrations_example_prisma_pg_flyways
    **/
    _count?: true | Migrations_example_prisma_pg_flywayCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Migrations_example_prisma_pg_flywayAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Migrations_example_prisma_pg_flywaySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Migrations_example_prisma_pg_flywayMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Migrations_example_prisma_pg_flywayMaxAggregateInputType
  }

  export type GetMigrations_example_prisma_pg_flywayAggregateType<T extends Migrations_example_prisma_pg_flywayAggregateArgs> = {
        [P in keyof T & keyof AggregateMigrations_example_prisma_pg_flyway]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMigrations_example_prisma_pg_flyway[P]>
      : GetScalarType<T[P], AggregateMigrations_example_prisma_pg_flyway[P]>
  }




  export type migrations_example_prisma_pg_flywayGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: migrations_example_prisma_pg_flywayWhereInput
    orderBy?: migrations_example_prisma_pg_flywayOrderByWithAggregationInput | migrations_example_prisma_pg_flywayOrderByWithAggregationInput[]
    by: Migrations_example_prisma_pg_flywayScalarFieldEnum[] | Migrations_example_prisma_pg_flywayScalarFieldEnum
    having?: migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Migrations_example_prisma_pg_flywayCountAggregateInputType | true
    _avg?: Migrations_example_prisma_pg_flywayAvgAggregateInputType
    _sum?: Migrations_example_prisma_pg_flywaySumAggregateInputType
    _min?: Migrations_example_prisma_pg_flywayMinAggregateInputType
    _max?: Migrations_example_prisma_pg_flywayMaxAggregateInputType
  }

  export type Migrations_example_prisma_pg_flywayGroupByOutputType = {
    installed_rank: number
    version: string | null
    description: string
    type: string
    script: string
    checksum: number | null
    installed_by: string
    installed_on: Date
    execution_time: number
    success: boolean
    _count: Migrations_example_prisma_pg_flywayCountAggregateOutputType | null
    _avg: Migrations_example_prisma_pg_flywayAvgAggregateOutputType | null
    _sum: Migrations_example_prisma_pg_flywaySumAggregateOutputType | null
    _min: Migrations_example_prisma_pg_flywayMinAggregateOutputType | null
    _max: Migrations_example_prisma_pg_flywayMaxAggregateOutputType | null
  }

  type GetMigrations_example_prisma_pg_flywayGroupByPayload<T extends migrations_example_prisma_pg_flywayGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Migrations_example_prisma_pg_flywayGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Migrations_example_prisma_pg_flywayGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Migrations_example_prisma_pg_flywayGroupByOutputType[P]>
            : GetScalarType<T[P], Migrations_example_prisma_pg_flywayGroupByOutputType[P]>
        }
      >
    >


  export type migrations_example_prisma_pg_flywaySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_prisma_pg_flyway"]>

  export type migrations_example_prisma_pg_flywaySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_prisma_pg_flyway"]>

  export type migrations_example_prisma_pg_flywaySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }, ExtArgs["result"]["migrations_example_prisma_pg_flyway"]>

  export type migrations_example_prisma_pg_flywaySelectScalar = {
    installed_rank?: boolean
    version?: boolean
    description?: boolean
    type?: boolean
    script?: boolean
    checksum?: boolean
    installed_by?: boolean
    installed_on?: boolean
    execution_time?: boolean
    success?: boolean
  }

  export type migrations_example_prisma_pg_flywayOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"installed_rank" | "version" | "description" | "type" | "script" | "checksum" | "installed_by" | "installed_on" | "execution_time" | "success", ExtArgs["result"]["migrations_example_prisma_pg_flyway"]>

  export type $migrations_example_prisma_pg_flywayPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "migrations_example_prisma_pg_flyway"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      installed_rank: number
      version: string | null
      description: string
      type: string
      script: string
      checksum: number | null
      installed_by: string
      installed_on: Date
      execution_time: number
      success: boolean
    }, ExtArgs["result"]["migrations_example_prisma_pg_flyway"]>
    composites: {}
  }

  type migrations_example_prisma_pg_flywayGetPayload<S extends boolean | null | undefined | migrations_example_prisma_pg_flywayDefaultArgs> = $Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload, S>

  type migrations_example_prisma_pg_flywayCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<migrations_example_prisma_pg_flywayFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Migrations_example_prisma_pg_flywayCountAggregateInputType | true
    }

  export interface migrations_example_prisma_pg_flywayDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['migrations_example_prisma_pg_flyway'], meta: { name: 'migrations_example_prisma_pg_flyway' } }
    /**
     * Find zero or one Migrations_example_prisma_pg_flyway that matches the filter.
     * @param {migrations_example_prisma_pg_flywayFindUniqueArgs} args - Arguments to find a Migrations_example_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends migrations_example_prisma_pg_flywayFindUniqueArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayFindUniqueArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Migrations_example_prisma_pg_flyway that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {migrations_example_prisma_pg_flywayFindUniqueOrThrowArgs} args - Arguments to find a Migrations_example_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends migrations_example_prisma_pg_flywayFindUniqueOrThrowArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations_example_prisma_pg_flyway that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayFindFirstArgs} args - Arguments to find a Migrations_example_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends migrations_example_prisma_pg_flywayFindFirstArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayFindFirstArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Migrations_example_prisma_pg_flyway that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayFindFirstOrThrowArgs} args - Arguments to find a Migrations_example_prisma_pg_flyway
     * @example
     * // Get one Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends migrations_example_prisma_pg_flywayFindFirstOrThrowArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Migrations_example_prisma_pg_flyways that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyways = await prisma.migrations_example_prisma_pg_flyway.findMany()
     * 
     * // Get first 10 Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyways = await prisma.migrations_example_prisma_pg_flyway.findMany({ take: 10 })
     * 
     * // Only select the `installed_rank`
     * const migrations_example_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_prisma_pg_flyway.findMany({ select: { installed_rank: true } })
     * 
     */
    findMany<T extends migrations_example_prisma_pg_flywayFindManyArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Migrations_example_prisma_pg_flyway.
     * @param {migrations_example_prisma_pg_flywayCreateArgs} args - Arguments to create a Migrations_example_prisma_pg_flyway.
     * @example
     * // Create one Migrations_example_prisma_pg_flyway
     * const Migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.create({
     *   data: {
     *     // ... data to create a Migrations_example_prisma_pg_flyway
     *   }
     * })
     * 
     */
    create<T extends migrations_example_prisma_pg_flywayCreateArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayCreateArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Migrations_example_prisma_pg_flyways.
     * @param {migrations_example_prisma_pg_flywayCreateManyArgs} args - Arguments to create many Migrations_example_prisma_pg_flyways.
     * @example
     * // Create many Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends migrations_example_prisma_pg_flywayCreateManyArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Migrations_example_prisma_pg_flyways and returns the data saved in the database.
     * @param {migrations_example_prisma_pg_flywayCreateManyAndReturnArgs} args - Arguments to create many Migrations_example_prisma_pg_flyways.
     * @example
     * // Create many Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Migrations_example_prisma_pg_flyways and only return the `installed_rank`
     * const migrations_example_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_prisma_pg_flyway.createManyAndReturn({
     *   select: { installed_rank: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends migrations_example_prisma_pg_flywayCreateManyAndReturnArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Migrations_example_prisma_pg_flyway.
     * @param {migrations_example_prisma_pg_flywayDeleteArgs} args - Arguments to delete one Migrations_example_prisma_pg_flyway.
     * @example
     * // Delete one Migrations_example_prisma_pg_flyway
     * const Migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.delete({
     *   where: {
     *     // ... filter to delete one Migrations_example_prisma_pg_flyway
     *   }
     * })
     * 
     */
    delete<T extends migrations_example_prisma_pg_flywayDeleteArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayDeleteArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Migrations_example_prisma_pg_flyway.
     * @param {migrations_example_prisma_pg_flywayUpdateArgs} args - Arguments to update one Migrations_example_prisma_pg_flyway.
     * @example
     * // Update one Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends migrations_example_prisma_pg_flywayUpdateArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayUpdateArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Migrations_example_prisma_pg_flyways.
     * @param {migrations_example_prisma_pg_flywayDeleteManyArgs} args - Arguments to filter Migrations_example_prisma_pg_flyways to delete.
     * @example
     * // Delete a few Migrations_example_prisma_pg_flyways
     * const { count } = await prisma.migrations_example_prisma_pg_flyway.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends migrations_example_prisma_pg_flywayDeleteManyArgs>(args?: SelectSubset<T, migrations_example_prisma_pg_flywayDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations_example_prisma_pg_flyways.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends migrations_example_prisma_pg_flywayUpdateManyArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Migrations_example_prisma_pg_flyways and returns the data updated in the database.
     * @param {migrations_example_prisma_pg_flywayUpdateManyAndReturnArgs} args - Arguments to update many Migrations_example_prisma_pg_flyways.
     * @example
     * // Update many Migrations_example_prisma_pg_flyways
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Migrations_example_prisma_pg_flyways and only return the `installed_rank`
     * const migrations_example_prisma_pg_flywayWithInstalled_rankOnly = await prisma.migrations_example_prisma_pg_flyway.updateManyAndReturn({
     *   select: { installed_rank: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends migrations_example_prisma_pg_flywayUpdateManyAndReturnArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Migrations_example_prisma_pg_flyway.
     * @param {migrations_example_prisma_pg_flywayUpsertArgs} args - Arguments to update or create a Migrations_example_prisma_pg_flyway.
     * @example
     * // Update or create a Migrations_example_prisma_pg_flyway
     * const migrations_example_prisma_pg_flyway = await prisma.migrations_example_prisma_pg_flyway.upsert({
     *   create: {
     *     // ... data to create a Migrations_example_prisma_pg_flyway
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Migrations_example_prisma_pg_flyway we want to update
     *   }
     * })
     */
    upsert<T extends migrations_example_prisma_pg_flywayUpsertArgs>(args: SelectSubset<T, migrations_example_prisma_pg_flywayUpsertArgs<ExtArgs>>): Prisma__migrations_example_prisma_pg_flywayClient<$Result.GetResult<Prisma.$migrations_example_prisma_pg_flywayPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Migrations_example_prisma_pg_flyways.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayCountArgs} args - Arguments to filter Migrations_example_prisma_pg_flyways to count.
     * @example
     * // Count the number of Migrations_example_prisma_pg_flyways
     * const count = await prisma.migrations_example_prisma_pg_flyway.count({
     *   where: {
     *     // ... the filter for the Migrations_example_prisma_pg_flyways we want to count
     *   }
     * })
    **/
    count<T extends migrations_example_prisma_pg_flywayCountArgs>(
      args?: Subset<T, migrations_example_prisma_pg_flywayCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Migrations_example_prisma_pg_flywayCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Migrations_example_prisma_pg_flyway.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Migrations_example_prisma_pg_flywayAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Migrations_example_prisma_pg_flywayAggregateArgs>(args: Subset<T, Migrations_example_prisma_pg_flywayAggregateArgs>): Prisma.PrismaPromise<GetMigrations_example_prisma_pg_flywayAggregateType<T>>

    /**
     * Group by Migrations_example_prisma_pg_flyway.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {migrations_example_prisma_pg_flywayGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends migrations_example_prisma_pg_flywayGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: migrations_example_prisma_pg_flywayGroupByArgs['orderBy'] }
        : { orderBy?: migrations_example_prisma_pg_flywayGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, migrations_example_prisma_pg_flywayGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMigrations_example_prisma_pg_flywayGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the migrations_example_prisma_pg_flyway model
   */
  readonly fields: migrations_example_prisma_pg_flywayFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for migrations_example_prisma_pg_flyway.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__migrations_example_prisma_pg_flywayClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the migrations_example_prisma_pg_flyway model
   */
  interface migrations_example_prisma_pg_flywayFieldRefs {
    readonly installed_rank: FieldRef<"migrations_example_prisma_pg_flyway", 'Int'>
    readonly version: FieldRef<"migrations_example_prisma_pg_flyway", 'String'>
    readonly description: FieldRef<"migrations_example_prisma_pg_flyway", 'String'>
    readonly type: FieldRef<"migrations_example_prisma_pg_flyway", 'String'>
    readonly script: FieldRef<"migrations_example_prisma_pg_flyway", 'String'>
    readonly checksum: FieldRef<"migrations_example_prisma_pg_flyway", 'Int'>
    readonly installed_by: FieldRef<"migrations_example_prisma_pg_flyway", 'String'>
    readonly installed_on: FieldRef<"migrations_example_prisma_pg_flyway", 'DateTime'>
    readonly execution_time: FieldRef<"migrations_example_prisma_pg_flyway", 'Int'>
    readonly success: FieldRef<"migrations_example_prisma_pg_flyway", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * migrations_example_prisma_pg_flyway findUnique
   */
  export type migrations_example_prisma_pg_flywayFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_prisma_pg_flyway to fetch.
     */
    where: migrations_example_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_prisma_pg_flyway findUniqueOrThrow
   */
  export type migrations_example_prisma_pg_flywayFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_prisma_pg_flyway to fetch.
     */
    where: migrations_example_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_prisma_pg_flyway findFirst
   */
  export type migrations_example_prisma_pg_flywayFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_prisma_pg_flyway to fetch.
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_prisma_pg_flywayOrderByWithRelationInput | migrations_example_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations_example_prisma_pg_flyways.
     */
    cursor?: migrations_example_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations_example_prisma_pg_flyways.
     */
    distinct?: Migrations_example_prisma_pg_flywayScalarFieldEnum | Migrations_example_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_prisma_pg_flyway findFirstOrThrow
   */
  export type migrations_example_prisma_pg_flywayFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_prisma_pg_flyway to fetch.
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_prisma_pg_flywayOrderByWithRelationInput | migrations_example_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for migrations_example_prisma_pg_flyways.
     */
    cursor?: migrations_example_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_prisma_pg_flyways.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of migrations_example_prisma_pg_flyways.
     */
    distinct?: Migrations_example_prisma_pg_flywayScalarFieldEnum | Migrations_example_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_prisma_pg_flyway findMany
   */
  export type migrations_example_prisma_pg_flywayFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter, which migrations_example_prisma_pg_flyways to fetch.
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of migrations_example_prisma_pg_flyways to fetch.
     */
    orderBy?: migrations_example_prisma_pg_flywayOrderByWithRelationInput | migrations_example_prisma_pg_flywayOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing migrations_example_prisma_pg_flyways.
     */
    cursor?: migrations_example_prisma_pg_flywayWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` migrations_example_prisma_pg_flyways from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` migrations_example_prisma_pg_flyways.
     */
    skip?: number
    distinct?: Migrations_example_prisma_pg_flywayScalarFieldEnum | Migrations_example_prisma_pg_flywayScalarFieldEnum[]
  }

  /**
   * migrations_example_prisma_pg_flyway create
   */
  export type migrations_example_prisma_pg_flywayCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data needed to create a migrations_example_prisma_pg_flyway.
     */
    data: XOR<migrations_example_prisma_pg_flywayCreateInput, migrations_example_prisma_pg_flywayUncheckedCreateInput>
  }

  /**
   * migrations_example_prisma_pg_flyway createMany
   */
  export type migrations_example_prisma_pg_flywayCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many migrations_example_prisma_pg_flyways.
     */
    data: migrations_example_prisma_pg_flywayCreateManyInput | migrations_example_prisma_pg_flywayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations_example_prisma_pg_flyway createManyAndReturn
   */
  export type migrations_example_prisma_pg_flywayCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data used to create many migrations_example_prisma_pg_flyways.
     */
    data: migrations_example_prisma_pg_flywayCreateManyInput | migrations_example_prisma_pg_flywayCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * migrations_example_prisma_pg_flyway update
   */
  export type migrations_example_prisma_pg_flywayUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data needed to update a migrations_example_prisma_pg_flyway.
     */
    data: XOR<migrations_example_prisma_pg_flywayUpdateInput, migrations_example_prisma_pg_flywayUncheckedUpdateInput>
    /**
     * Choose, which migrations_example_prisma_pg_flyway to update.
     */
    where: migrations_example_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_prisma_pg_flyway updateMany
   */
  export type migrations_example_prisma_pg_flywayUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update migrations_example_prisma_pg_flyways.
     */
    data: XOR<migrations_example_prisma_pg_flywayUpdateManyMutationInput, migrations_example_prisma_pg_flywayUncheckedUpdateManyInput>
    /**
     * Filter which migrations_example_prisma_pg_flyways to update
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_prisma_pg_flyways to update.
     */
    limit?: number
  }

  /**
   * migrations_example_prisma_pg_flyway updateManyAndReturn
   */
  export type migrations_example_prisma_pg_flywayUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The data used to update migrations_example_prisma_pg_flyways.
     */
    data: XOR<migrations_example_prisma_pg_flywayUpdateManyMutationInput, migrations_example_prisma_pg_flywayUncheckedUpdateManyInput>
    /**
     * Filter which migrations_example_prisma_pg_flyways to update
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_prisma_pg_flyways to update.
     */
    limit?: number
  }

  /**
   * migrations_example_prisma_pg_flyway upsert
   */
  export type migrations_example_prisma_pg_flywayUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * The filter to search for the migrations_example_prisma_pg_flyway to update in case it exists.
     */
    where: migrations_example_prisma_pg_flywayWhereUniqueInput
    /**
     * In case the migrations_example_prisma_pg_flyway found by the `where` argument doesn't exist, create a new migrations_example_prisma_pg_flyway with this data.
     */
    create: XOR<migrations_example_prisma_pg_flywayCreateInput, migrations_example_prisma_pg_flywayUncheckedCreateInput>
    /**
     * In case the migrations_example_prisma_pg_flyway was found with the provided `where` argument, update it with this data.
     */
    update: XOR<migrations_example_prisma_pg_flywayUpdateInput, migrations_example_prisma_pg_flywayUncheckedUpdateInput>
  }

  /**
   * migrations_example_prisma_pg_flyway delete
   */
  export type migrations_example_prisma_pg_flywayDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
    /**
     * Filter which migrations_example_prisma_pg_flyway to delete.
     */
    where: migrations_example_prisma_pg_flywayWhereUniqueInput
  }

  /**
   * migrations_example_prisma_pg_flyway deleteMany
   */
  export type migrations_example_prisma_pg_flywayDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which migrations_example_prisma_pg_flyways to delete
     */
    where?: migrations_example_prisma_pg_flywayWhereInput
    /**
     * Limit how many migrations_example_prisma_pg_flyways to delete.
     */
    limit?: number
  }

  /**
   * migrations_example_prisma_pg_flyway without action
   */
  export type migrations_example_prisma_pg_flywayDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the migrations_example_prisma_pg_flyway
     */
    select?: migrations_example_prisma_pg_flywaySelect<ExtArgs> | null
    /**
     * Omit specific fields from the migrations_example_prisma_pg_flyway
     */
    omit?: migrations_example_prisma_pg_flywayOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PgFlywayPrismaUserScalarFieldEnum: {
    id: 'id',
    externalUserId: 'externalUserId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PgFlywayPrismaUserScalarFieldEnum = (typeof PgFlywayPrismaUserScalarFieldEnum)[keyof typeof PgFlywayPrismaUserScalarFieldEnum]


  export const Migrations_example_pg_prisma_pg_flywayScalarFieldEnum: {
    installed_rank: 'installed_rank',
    version: 'version',
    description: 'description',
    type: 'type',
    script: 'script',
    checksum: 'checksum',
    installed_by: 'installed_by',
    installed_on: 'installed_on',
    execution_time: 'execution_time',
    success: 'success'
  };

  export type Migrations_example_pg_prisma_pg_flywayScalarFieldEnum = (typeof Migrations_example_pg_prisma_pg_flywayScalarFieldEnum)[keyof typeof Migrations_example_pg_prisma_pg_flywayScalarFieldEnum]


  export const Migrations_example_prisma_pg_flywayScalarFieldEnum: {
    installed_rank: 'installed_rank',
    version: 'version',
    description: 'description',
    type: 'type',
    script: 'script',
    checksum: 'checksum',
    installed_by: 'installed_by',
    installed_on: 'installed_on',
    execution_time: 'execution_time',
    success: 'success'
  };

  export type Migrations_example_prisma_pg_flywayScalarFieldEnum = (typeof Migrations_example_prisma_pg_flywayScalarFieldEnum)[keyof typeof Migrations_example_prisma_pg_flywayScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PgFlywayPrismaUserWhereInput = {
    AND?: PgFlywayPrismaUserWhereInput | PgFlywayPrismaUserWhereInput[]
    OR?: PgFlywayPrismaUserWhereInput[]
    NOT?: PgFlywayPrismaUserWhereInput | PgFlywayPrismaUserWhereInput[]
    id?: UuidFilter<"PgFlywayPrismaUser"> | string
    externalUserId?: UuidFilter<"PgFlywayPrismaUser"> | string
    createdAt?: DateTimeFilter<"PgFlywayPrismaUser"> | Date | string
    updatedAt?: DateTimeFilter<"PgFlywayPrismaUser"> | Date | string
  }

  export type PgFlywayPrismaUserOrderByWithRelationInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PgFlywayPrismaUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    externalUserId?: string
    AND?: PgFlywayPrismaUserWhereInput | PgFlywayPrismaUserWhereInput[]
    OR?: PgFlywayPrismaUserWhereInput[]
    NOT?: PgFlywayPrismaUserWhereInput | PgFlywayPrismaUserWhereInput[]
    createdAt?: DateTimeFilter<"PgFlywayPrismaUser"> | Date | string
    updatedAt?: DateTimeFilter<"PgFlywayPrismaUser"> | Date | string
  }, "id" | "externalUserId">

  export type PgFlywayPrismaUserOrderByWithAggregationInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PgFlywayPrismaUserCountOrderByAggregateInput
    _max?: PgFlywayPrismaUserMaxOrderByAggregateInput
    _min?: PgFlywayPrismaUserMinOrderByAggregateInput
  }

  export type PgFlywayPrismaUserScalarWhereWithAggregatesInput = {
    AND?: PgFlywayPrismaUserScalarWhereWithAggregatesInput | PgFlywayPrismaUserScalarWhereWithAggregatesInput[]
    OR?: PgFlywayPrismaUserScalarWhereWithAggregatesInput[]
    NOT?: PgFlywayPrismaUserScalarWhereWithAggregatesInput | PgFlywayPrismaUserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"PgFlywayPrismaUser"> | string
    externalUserId?: UuidWithAggregatesFilter<"PgFlywayPrismaUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PgFlywayPrismaUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PgFlywayPrismaUser"> | Date | string
  }

  export type migrations_example_pg_prisma_pg_flywayWhereInput = {
    AND?: migrations_example_pg_prisma_pg_flywayWhereInput | migrations_example_pg_prisma_pg_flywayWhereInput[]
    OR?: migrations_example_pg_prisma_pg_flywayWhereInput[]
    NOT?: migrations_example_pg_prisma_pg_flywayWhereInput | migrations_example_pg_prisma_pg_flywayWhereInput[]
    installed_rank?: IntFilter<"migrations_example_pg_prisma_pg_flyway"> | number
    version?: StringNullableFilter<"migrations_example_pg_prisma_pg_flyway"> | string | null
    description?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    type?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    script?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    checksum?: IntNullableFilter<"migrations_example_pg_prisma_pg_flyway"> | number | null
    installed_by?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    installed_on?: DateTimeFilter<"migrations_example_pg_prisma_pg_flyway"> | Date | string
    execution_time?: IntFilter<"migrations_example_pg_prisma_pg_flyway"> | number
    success?: BoolFilter<"migrations_example_pg_prisma_pg_flyway"> | boolean
  }

  export type migrations_example_pg_prisma_pg_flywayOrderByWithRelationInput = {
    installed_rank?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrderInput | SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_pg_prisma_pg_flywayWhereUniqueInput = Prisma.AtLeast<{
    installed_rank?: number
    AND?: migrations_example_pg_prisma_pg_flywayWhereInput | migrations_example_pg_prisma_pg_flywayWhereInput[]
    OR?: migrations_example_pg_prisma_pg_flywayWhereInput[]
    NOT?: migrations_example_pg_prisma_pg_flywayWhereInput | migrations_example_pg_prisma_pg_flywayWhereInput[]
    version?: StringNullableFilter<"migrations_example_pg_prisma_pg_flyway"> | string | null
    description?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    type?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    script?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    checksum?: IntNullableFilter<"migrations_example_pg_prisma_pg_flyway"> | number | null
    installed_by?: StringFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    installed_on?: DateTimeFilter<"migrations_example_pg_prisma_pg_flyway"> | Date | string
    execution_time?: IntFilter<"migrations_example_pg_prisma_pg_flyway"> | number
    success?: BoolFilter<"migrations_example_pg_prisma_pg_flyway"> | boolean
  }, "installed_rank">

  export type migrations_example_pg_prisma_pg_flywayOrderByWithAggregationInput = {
    installed_rank?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrderInput | SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
    _count?: migrations_example_pg_prisma_pg_flywayCountOrderByAggregateInput
    _avg?: migrations_example_pg_prisma_pg_flywayAvgOrderByAggregateInput
    _max?: migrations_example_pg_prisma_pg_flywayMaxOrderByAggregateInput
    _min?: migrations_example_pg_prisma_pg_flywayMinOrderByAggregateInput
    _sum?: migrations_example_pg_prisma_pg_flywaySumOrderByAggregateInput
  }

  export type migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput = {
    AND?: migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput | migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    OR?: migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    NOT?: migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput | migrations_example_pg_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    installed_rank?: IntWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | number
    version?: StringNullableWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | string | null
    description?: StringWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    type?: StringWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    script?: StringWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    checksum?: IntNullableWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | number | null
    installed_by?: StringWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | string
    installed_on?: DateTimeWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | Date | string
    execution_time?: IntWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | number
    success?: BoolWithAggregatesFilter<"migrations_example_pg_prisma_pg_flyway"> | boolean
  }

  export type migrations_example_prisma_pg_flywayWhereInput = {
    AND?: migrations_example_prisma_pg_flywayWhereInput | migrations_example_prisma_pg_flywayWhereInput[]
    OR?: migrations_example_prisma_pg_flywayWhereInput[]
    NOT?: migrations_example_prisma_pg_flywayWhereInput | migrations_example_prisma_pg_flywayWhereInput[]
    installed_rank?: IntFilter<"migrations_example_prisma_pg_flyway"> | number
    version?: StringNullableFilter<"migrations_example_prisma_pg_flyway"> | string | null
    description?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    type?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    script?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    checksum?: IntNullableFilter<"migrations_example_prisma_pg_flyway"> | number | null
    installed_by?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    installed_on?: DateTimeFilter<"migrations_example_prisma_pg_flyway"> | Date | string
    execution_time?: IntFilter<"migrations_example_prisma_pg_flyway"> | number
    success?: BoolFilter<"migrations_example_prisma_pg_flyway"> | boolean
  }

  export type migrations_example_prisma_pg_flywayOrderByWithRelationInput = {
    installed_rank?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrderInput | SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_prisma_pg_flywayWhereUniqueInput = Prisma.AtLeast<{
    installed_rank?: number
    AND?: migrations_example_prisma_pg_flywayWhereInput | migrations_example_prisma_pg_flywayWhereInput[]
    OR?: migrations_example_prisma_pg_flywayWhereInput[]
    NOT?: migrations_example_prisma_pg_flywayWhereInput | migrations_example_prisma_pg_flywayWhereInput[]
    version?: StringNullableFilter<"migrations_example_prisma_pg_flyway"> | string | null
    description?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    type?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    script?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    checksum?: IntNullableFilter<"migrations_example_prisma_pg_flyway"> | number | null
    installed_by?: StringFilter<"migrations_example_prisma_pg_flyway"> | string
    installed_on?: DateTimeFilter<"migrations_example_prisma_pg_flyway"> | Date | string
    execution_time?: IntFilter<"migrations_example_prisma_pg_flyway"> | number
    success?: BoolFilter<"migrations_example_prisma_pg_flyway"> | boolean
  }, "installed_rank">

  export type migrations_example_prisma_pg_flywayOrderByWithAggregationInput = {
    installed_rank?: SortOrder
    version?: SortOrderInput | SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrderInput | SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
    _count?: migrations_example_prisma_pg_flywayCountOrderByAggregateInput
    _avg?: migrations_example_prisma_pg_flywayAvgOrderByAggregateInput
    _max?: migrations_example_prisma_pg_flywayMaxOrderByAggregateInput
    _min?: migrations_example_prisma_pg_flywayMinOrderByAggregateInput
    _sum?: migrations_example_prisma_pg_flywaySumOrderByAggregateInput
  }

  export type migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput = {
    AND?: migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput | migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    OR?: migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    NOT?: migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput | migrations_example_prisma_pg_flywayScalarWhereWithAggregatesInput[]
    installed_rank?: IntWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | number
    version?: StringNullableWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | string | null
    description?: StringWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | string
    type?: StringWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | string
    script?: StringWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | string
    checksum?: IntNullableWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | number | null
    installed_by?: StringWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | string
    installed_on?: DateTimeWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | Date | string
    execution_time?: IntWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | number
    success?: BoolWithAggregatesFilter<"migrations_example_prisma_pg_flyway"> | boolean
  }

  export type PgFlywayPrismaUserCreateInput = {
    id?: string
    externalUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PgFlywayPrismaUserUncheckedCreateInput = {
    id?: string
    externalUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PgFlywayPrismaUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PgFlywayPrismaUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PgFlywayPrismaUserCreateManyInput = {
    id?: string
    externalUserId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PgFlywayPrismaUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PgFlywayPrismaUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    externalUserId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type migrations_example_pg_prisma_pg_flywayCreateInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_pg_prisma_pg_flywayUncheckedCreateInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_pg_prisma_pg_flywayUpdateInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_pg_prisma_pg_flywayUncheckedUpdateInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_pg_prisma_pg_flywayCreateManyInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_pg_prisma_pg_flywayUpdateManyMutationInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_pg_prisma_pg_flywayUncheckedUpdateManyInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_prisma_pg_flywayCreateInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_prisma_pg_flywayUncheckedCreateInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_prisma_pg_flywayUpdateInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_prisma_pg_flywayUncheckedUpdateInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_prisma_pg_flywayCreateManyInput = {
    installed_rank: number
    version?: string | null
    description: string
    type: string
    script: string
    checksum?: number | null
    installed_by: string
    installed_on?: Date | string
    execution_time: number
    success: boolean
  }

  export type migrations_example_prisma_pg_flywayUpdateManyMutationInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type migrations_example_prisma_pg_flywayUncheckedUpdateManyInput = {
    installed_rank?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    checksum?: NullableIntFieldUpdateOperationsInput | number | null
    installed_by?: StringFieldUpdateOperationsInput | string
    installed_on?: DateTimeFieldUpdateOperationsInput | Date | string
    execution_time?: IntFieldUpdateOperationsInput | number
    success?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PgFlywayPrismaUserCountOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PgFlywayPrismaUserMaxOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PgFlywayPrismaUserMinOrderByAggregateInput = {
    id?: SortOrder
    externalUserId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type migrations_example_pg_prisma_pg_flywayCountOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_pg_prisma_pg_flywayAvgOrderByAggregateInput = {
    installed_rank?: SortOrder
    checksum?: SortOrder
    execution_time?: SortOrder
  }

  export type migrations_example_pg_prisma_pg_flywayMaxOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_pg_prisma_pg_flywayMinOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_pg_prisma_pg_flywaySumOrderByAggregateInput = {
    installed_rank?: SortOrder
    checksum?: SortOrder
    execution_time?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type migrations_example_prisma_pg_flywayCountOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_prisma_pg_flywayAvgOrderByAggregateInput = {
    installed_rank?: SortOrder
    checksum?: SortOrder
    execution_time?: SortOrder
  }

  export type migrations_example_prisma_pg_flywayMaxOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_prisma_pg_flywayMinOrderByAggregateInput = {
    installed_rank?: SortOrder
    version?: SortOrder
    description?: SortOrder
    type?: SortOrder
    script?: SortOrder
    checksum?: SortOrder
    installed_by?: SortOrder
    installed_on?: SortOrder
    execution_time?: SortOrder
    success?: SortOrder
  }

  export type migrations_example_prisma_pg_flywaySumOrderByAggregateInput = {
    installed_rank?: SortOrder
    checksum?: SortOrder
    execution_time?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}