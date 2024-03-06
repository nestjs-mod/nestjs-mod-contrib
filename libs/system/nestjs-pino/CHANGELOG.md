# [1.12.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.11.1...pino-v1.12.0) (2024-03-06)


### Features

* add @nestjs-mod/authorizer for work with https://authorizer.dev/, add DockerComposeAuthorizer for deploy authorizer server, add option notStaticKeysOfEnvironments in docker services for exclude some keys from generated dot env file ([12380a4](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/12380a4c690345265b4df02de51250c96f21e417))

## [1.11.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.11.0...pino-v1.11.1) (2024-02-17)


### Bug Fixes

* ignore error if header is empty ([5f02c75](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/5f02c754b1938f6772d4e67e9a85e4c84692ce01))

# [1.11.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.10.0...pino-v1.11.0) (2024-02-13)


### Features

* add DockerComposeMinio in @nestjs-mod/docker-compose, add @nestjs-mod/minio ([0d3f9b7](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/0d3f9b74ad4eb79476eda1be6266bac636d3d4a5))
* add DockerComposeNginx to @nestjs-mod/docker-compose, add use nginx in docker-compose for minio and disable cors validations, update readme in all modules ([87cb34a](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/87cb34ad31aab7e8d5fbc9510d43b501529ac9d0))

# [1.10.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.9.0...pino-v1.10.0) (2024-02-09)


### Features

* add GraphqlModule in @nestjs-mod/graphql, add @nestjs-mod/cache-manager, update code in @nestjs-mod/pino, update readme in all modules, update @nestjs-mod/common version ([c36b138](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/c36b13870b6754a80c38a482aa0cb34bddafa2ed))

# [1.9.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.8.1...pino-v1.9.0) (2024-02-07)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.6.1 to 2.6.3 ([e8b7f80](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/e8b7f8084cdb5ac15bf8ea127139adc1735214a1))


### Features

* add DockerComposeRedis in @nestjs-mod/docker-compose, add @nestjs-mod/cache-manager, rename FlywayModule to Flyway, rename NestjsPinoLogger to NestjsPinoLoggerModule, rename TerminusHealthCheck to TerminusHealthCheckModule, remove all async work with fs ([1c5474a](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/1c5474afc696d3e23f38fdf3e0865ab75bc71446))

## [1.8.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.8.0...pino-v1.8.1) (2024-02-01)


### Bug Fixes

* add create directory when we try create or update some files from infrastructure logic ([90e3ea8](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/90e3ea87a136002966e3b973a69caab1421f9423))

# [1.8.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.7.1...pino-v1.8.0) (2024-02-01)


### Features

* add @nestjs-mod/flyway ([ab20eef](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/ab20eef94166f6be10b39d2ef72ac8873ddb691c))

## [1.7.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.7.0...pino-v1.7.1) (2024-01-30)


### Bug Fixes

* update logic for generate package json scripts, add order for categories ([66e0753](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/66e07536875d5574fefb6e307e6dfd17c1596ca8))

# [1.7.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.6.2...pino-v1.7.0) (2024-01-30)


### Features

* the files and commands added to the infrastructure have been expanded, and examples of working with libraries have been added ([7f6c852](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/7f6c8522f51397ef78a36d6bae09a62f19418518))

## [1.6.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.6.1...pino-v1.6.2) (2024-01-24)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.2 to 2.5.3 ([ba4d80c](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/ba4d80c6fb0c0fcd2dc608efa5abf581bb01bc43))

## [1.6.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.6.0...pino-v1.6.1) (2024-01-24)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.0 to 2.5.1 ([611bd6c](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/611bd6ccf9fc78c63b7666625874e68420f5a357))
* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.0 to 2.5.2 ([e4aec57](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/e4aec57531c6fbb456fb1e4d19c3984e9533dd9b))

# [1.6.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.5.0...pino-v1.6.0) (2024-01-23)


### Features

* add @nestjs-mod/prisma, update docker-compose for correct work with envs ([750f302](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/750f3022e42dd7af3aca2344d92bb1406b9009cc))

# [1.5.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.4.0...pino-v1.5.0) (2024-01-21)


### Features

* add @nestjs-mod/docker-compose ([b5ddd56](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/b5ddd569e4374939e5760b13bbd1246dd59673d3))

# [1.4.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.3.2...pino-v1.4.0) (2024-01-19)


### Features

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 1.9.0 to 2.1.0 ([4b58355](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/4b58355f755d25ac94fe9267efb9439e23c73a21))

## [1.3.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.3.1...pino-v1.3.2) (2024-01-18)


### Bug Fixes

* add all decorators to terminus ([9d85ae1](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/9d85ae133950104a9cd686aa8a4c12784f615fc1))
* add peerDependenciesMeta ([872378b](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/872378be9bba0a20e581ad662745ee9b155afff1))

## [1.3.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.3.0...pino-v1.3.1) (2024-01-18)


### Bug Fixes

* move part of deps to peerDependencies ([5891862](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/58918621da29ede968c04f9e00c5b6dfa0bd80de))

# [1.3.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.2.1...pino-v1.3.0) (2024-01-17)


### Features

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 1.7.2 to 1.9.0 ([182faa0](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/182faa05ab60dd8e2f13f3fb04b472a7a05f6a75))

## [1.2.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.2.0...pino-v1.2.1) (2024-01-17)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions ([2fd4938](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/2fd4938860367bffb40cff131a1b248a9add062e))

# [1.2.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.1.1...pino-v1.2.0) (2024-01-16)


### Features

* add @nestjs-mod/pm2 ([a0b3f39](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/a0b3f392976d9380f2f7efb3c1ed5825e741e87e))

## [1.1.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.1.0...pino-v1.1.1) (2024-01-12)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) deps ([6a4c714](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/6a4c714ca98be0b871e2f5ab5dabf3339337fee5))

# [1.1.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.0.1...pino-v1.1.0) (2024-01-12)


### Features

* update deps and add TerminusHealthCheck module ([2d1a334](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/2d1a334291246adf3e7e3ccd83346eda113ad31a))

## [1.0.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pino-v1.0.0...pino-v1.0.1) (2024-01-10)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) deps ([4c28452](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/4c28452792a17d311ae825f5d100be537f682e07))

# 1.0.0 (2024-01-09)


### Bug Fixes

* share all used files ([59ca743](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/59ca74368cb19579d3e52f37bbc5576146f0c9ec))
* update deps ([f4d75da](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/f4d75da337d7097dcc8a6e9aca7797bd5c5a77a6))
* update deps ([ca65a2d](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/ca65a2d531fe5a97871704a0d9d6f9717a39b903))


### Features

* **pin:** add Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino) ([55466f5](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/55466f52ccf1792a5a4f32df80e574be4da71952))
