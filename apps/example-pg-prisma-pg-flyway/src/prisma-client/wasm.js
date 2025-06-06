
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/wasm-compiler-edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.9.0
 * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
 */
Prisma.prismaVersion = {
  client: "6.9.0",
  engine: "81e4af48011447c3cc503a190e86995b66d2a28e"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PgFlywayPrismaUserScalarFieldEnum = {
  id: 'id',
  externalUserId: 'externalUserId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.Migrations_example_pg_prisma_pg_flywayScalarFieldEnum = {
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

exports.Prisma.Migrations_example_prisma_pg_flywayScalarFieldEnum = {
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

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  PgFlywayPrismaUser: 'PgFlywayPrismaUser',
  migrations_example_pg_prisma_pg_flyway: 'migrations_example_pg_prisma_pg_flyway',
  migrations_example_prisma_pg_flyway: 'migrations_example_prisma_pg_flyway'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/src/prisma-client",
      "fromEnvVar": null
    },
    "config": {
      "moduleFormat": "cjs",
      "engineType": "client"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters",
      "queryCompiler"
    ],
    "sourceFilePath": "/home/endy/Projects/nestjs-mod/nestjs-mod-contrib/apps/example-pg-prisma-pg-flyway/src/prisma/pg-flyway-pg-prisma-schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../.env"
  },
  "relativePath": "../prisma",
  "clientVersion": "6.9.0",
  "engineVersion": "81e4af48011447c3cc503a190e86995b66d2a28e",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider = \"prisma-client-js\"\n\n  output = \"../../../../apps/example-pg-prisma-pg-flyway/src/prisma-client\"\n\n  previewFeatures = [\"queryCompiler\", \"driverAdapters\"]\n\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"postgres\"\n  url      = env(\"EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL\")\n}\n\nmodel PgFlywayPrismaUser {\n  id             String   @id(map: \"PK_PG_FLYWAY_PRISMA_USER\") @default(dbgenerated(\"uuid_generate_v4()\")) @db.Uuid\n  externalUserId String   @unique(map: \"UQ_PG_FLYWAY_PRISMA_USER\") @db.Uuid\n  createdAt      DateTime @default(now()) @db.Timestamp(6)\n  updatedAt      DateTime @default(now()) @db.Timestamp(6)\n}\n\nmodel migrations_example_pg_prisma_pg_flyway {\n  installed_rank Int      @id(map: \"__migrations_example_pg_prisma_pg_flyway_pk\")\n  version        String?  @db.VarChar(50)\n  description    String   @db.VarChar(200)\n  type           String   @db.VarChar(20)\n  script         String   @db.VarChar(1000)\n  checksum       Int?\n  installed_by   String   @db.VarChar(100)\n  installed_on   DateTime @default(now()) @db.Timestamp(6)\n  execution_time Int\n  success        Boolean\n\n  @@index([success], map: \"__migrations_example_pg_prisma_pg_flyway_s_idx\")\n  @@map(\"__migrations_example_pg_prisma_pg_flyway\")\n}\n\nmodel migrations_example_prisma_pg_flyway {\n  installed_rank Int      @id(map: \"__migrations_example_prisma_pg_flyway_pk\")\n  version        String?  @db.VarChar(50)\n  description    String   @db.VarChar(200)\n  type           String   @db.VarChar(20)\n  script         String   @db.VarChar(1000)\n  checksum       Int?\n  installed_by   String   @db.VarChar(100)\n  installed_on   DateTime @default(now()) @db.Timestamp(6)\n  execution_time Int\n  success        Boolean\n\n  @@index([success], map: \"__migrations_example_prisma_pg_flyway_s_idx\")\n  @@map(\"__migrations_example_prisma_pg_flyway\")\n}\n",
  "inlineSchemaHash": "2ec73ead9f7165b72a982982b4d1c4c19095495f5ed02ffe02000421cfcd3644",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"PgFlywayPrismaUser\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"externalUserId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"migrations_example_pg_prisma_pg_flyway\":{\"fields\":[{\"name\":\"installed_rank\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"script\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"checksum\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"installed_by\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"installed_on\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"execution_time\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"success\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":\"__migrations_example_pg_prisma_pg_flyway\"},\"migrations_example_prisma_pg_flyway\":{\"fields\":[{\"name\":\"installed_rank\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"script\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"checksum\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"installed_by\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"installed_on\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"execution_time\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"success\",\"kind\":\"scalar\",\"type\":\"Boolean\"}],\"dbName\":\"__migrations_example_prisma_pg_flyway\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = {
  getRuntime: async () => require('./query_compiler_bg.js'),
  getQueryCompilerWasmModule: async () => {
    const loader = (await import('#wasm-compiler-loader')).default
    const compiler = (await loader).default
    return compiler
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.EXAMPLE_PG_PRISMA_PG_FLYWAY_PG_FLYWAY_PG_PRISMA_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

