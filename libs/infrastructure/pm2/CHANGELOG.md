## [1.11.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.11.0...pm2-v1.11.1) (2024-05-04)


### Bug Fixes

* update nestjs-mod libs ([aee56d5](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/aee56d58a3d60cb3d1969cea12cf1f8c27cbdf57))

# [1.11.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.10.0...pm2-v1.11.0) (2024-03-07)


### Features

* update logic for search env keys in docker compose services, use service name as prefix for env key name ([e544c7b](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/e544c7b093094d5ccb1b9766430ac1e5e434a475))

# [1.10.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.9.1...pm2-v1.10.0) (2024-03-06)


### Features

* add @nestjs-mod/authorizer for work with https://authorizer.dev/, add DockerComposeAuthorizer for deploy authorizer server, add option notStaticKeysOfEnvironments in docker services for exclude some keys from generated dot env file ([12380a4](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/12380a4c690345265b4df02de51250c96f21e417))

## [1.9.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.9.0...pm2-v1.9.1) (2024-02-22)


### Bug Fixes

* add transform: new NumberTransformer() for all number options in settings ([71fc6d8](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/71fc6d84936e4ba0dfa0881a2e1ff57b5b03914f))

# [1.9.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.8.0...pm2-v1.9.0) (2024-02-13)


### Features

* add DockerComposeMinio in @nestjs-mod/docker-compose, add @nestjs-mod/minio ([0d3f9b7](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/0d3f9b74ad4eb79476eda1be6266bac636d3d4a5))
* add DockerComposeNginx to @nestjs-mod/docker-compose, add use nginx in docker-compose for minio and disable cors validations, update readme in all modules ([87cb34a](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/87cb34ad31aab7e8d5fbc9510d43b501529ac9d0))

# [1.8.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.7.0...pm2-v1.8.0) (2024-02-09)


### Features

* add GraphqlModule in @nestjs-mod/graphql, add @nestjs-mod/cache-manager, update code in @nestjs-mod/pino, update readme in all modules, update @nestjs-mod/common version ([c36b138](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/c36b13870b6754a80c38a482aa0cb34bddafa2ed))

# [1.7.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.6.2...pm2-v1.7.0) (2024-02-07)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.6.1 to 2.6.3 ([e8b7f80](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/e8b7f8084cdb5ac15bf8ea127139adc1735214a1))


### Features

* add DockerComposeRedis in @nestjs-mod/docker-compose, add @nestjs-mod/cache-manager, rename FlywayModule to Flyway, rename NestjsPinoLogger to NestjsPinoLoggerModule, rename TerminusHealthCheck to TerminusHealthCheckModule, remove all async work with fs ([1c5474a](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/1c5474afc696d3e23f38fdf3e0865ab75bc71446))

## [1.6.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.6.1...pm2-v1.6.2) (2024-02-01)


### Bug Fixes

* add create directory when we try create or update some files from infrastructure logic ([90e3ea8](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/90e3ea87a136002966e3b973a69caab1421f9423))

## [1.6.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.6.0...pm2-v1.6.1) (2024-02-01)


### Bug Fixes

* add readme to PM2 ([90414fc](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/90414fc9d281ad68225c228a975beafc9aef0e36))

# [1.6.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.5.1...pm2-v1.6.0) (2024-02-01)


### Bug Fixes

* move dependencies from code to dependenciesInfo and readme, update generator for ecosystem.config.json ([7aa6ce1](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/7aa6ce1bac8c0f5938d939f3d463c490882dc47c))


### Features

* add @nestjs-mod/flyway ([ab20eef](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/ab20eef94166f6be10b39d2ef72ac8873ddb691c))

## [1.5.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.5.0...pm2-v1.5.1) (2024-01-30)


### Bug Fixes

* update logic for generate package json scripts, add order for categories ([66e0753](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/66e07536875d5574fefb6e307e6dfd17c1596ca8))

# [1.5.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.4.2...pm2-v1.5.0) (2024-01-30)


### Features

* the files and commands added to the infrastructure have been expanded, and examples of working with libraries have been added ([7f6c852](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/7f6c8522f51397ef78a36d6bae09a62f19418518))

## [1.4.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.4.1...pm2-v1.4.2) (2024-01-24)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.2 to 2.5.3 ([ba4d80c](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/ba4d80c6fb0c0fcd2dc608efa5abf581bb01bc43))

## [1.4.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.4.0...pm2-v1.4.1) (2024-01-24)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.0 to 2.5.1 ([611bd6c](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/611bd6ccf9fc78c63b7666625874e68420f5a357))
* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 2.5.0 to 2.5.2 ([e4aec57](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/e4aec57531c6fbb456fb1e4d19c3984e9533dd9b))

# [1.4.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.3.0...pm2-v1.4.0) (2024-01-23)


### Features

* add @nestjs-mod/prisma, update docker-compose for correct work with envs ([750f302](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/750f3022e42dd7af3aca2344d92bb1406b9009cc))

# [1.3.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.2.0...pm2-v1.3.0) (2024-01-21)


### Features

* add @nestjs-mod/docker-compose ([b5ddd56](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/b5ddd569e4374939e5760b13bbd1246dd59673d3))

# [1.2.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.1.2...pm2-v1.2.0) (2024-01-19)


### Features

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 1.9.0 to 2.1.0 ([4b58355](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/4b58355f755d25ac94fe9267efb9439e23c73a21))

## [1.1.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.1.1...pm2-v1.1.2) (2024-01-18)


### Bug Fixes

* add peerDependenciesMeta ([872378b](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/872378be9bba0a20e581ad662745ee9b155afff1))

## [1.1.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.1.0...pm2-v1.1.1) (2024-01-18)


### Bug Fixes

* move part of deps to peerDependencies ([5891862](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/58918621da29ede968c04f9e00c5b6dfa0bd80de))

# [1.1.0](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.0.2...pm2-v1.1.0) (2024-01-17)


### Features

* update [@nestjs-mod](https://github.com/nestjs-mod) versions from 1.7.2 to 1.9.0 ([182faa0](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/182faa05ab60dd8e2f13f3fb04b472a7a05f6a75))

## [1.0.2](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.0.1...pm2-v1.0.2) (2024-01-17)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) versions ([2fd4938](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/2fd4938860367bffb40cff131a1b248a9add062e))

## [1.0.1](https://github.com/nestjs-mod/nestjs-mod-contrib/compare/pm2-v1.0.0...pm2-v1.0.1) (2024-01-16)


### Bug Fixes

* **pm2:** update scripts for pm2 start ([5a54244](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/5a542440ca811a2e22865fa5f42a44d89d268b1a))

# 1.0.0 (2024-01-16)


### Bug Fixes

* update [@nestjs-mod](https://github.com/nestjs-mod) deps ([6a4c714](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/6a4c714ca98be0b871e2f5ab5dabf3339337fee5))
* update [@nestjs-mod](https://github.com/nestjs-mod) deps ([4c28452](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/4c28452792a17d311ae825f5d100be537f682e07))


### Features

* add @nestjs-mod/pm2 ([a0b3f39](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/a0b3f392976d9380f2f7efb3c1ed5825e741e87e))
* **pin:** add Pino logger for NestJS-mod (Wrapper for https://www.npmjs.com/package/nestjs-pino) ([55466f5](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/55466f52ccf1792a5a4f32df80e574be4da71952))
* update deps and add TerminusHealthCheck module ([2d1a334](https://github.com/nestjs-mod/nestjs-mod-contrib/commit/2d1a334291246adf3e7e3ccd83346eda113ad31a))
