<p align="center">
  <a href="https://github.com/nestjs-mod/" target="blank"><img src="https://avatars.githubusercontent.com/u/155752954?s=200&v=4" width="120" alt="NestJS-mod Logo" /></a>
</p>

  <p align="center">A collection of modules unified for <a href="https://github.com/nestjs-mod" target="_blank">NestJS-mod</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/org/nestjs-mod" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs-mod/common.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/org/nestjs-mod" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs-mod/common.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/org/nestjs-mod" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs-mod/common.svg" alt="NPM Downloads" /></a>
<a href="https://github.com/nestjs-mod/nestjs-mod/actions/workflows/release.yml" target="_blank"><img src="https://github.com/nestjs-mod/nestjs-mod/actions/workflows/release.yml/badge.svg" alt="Release to NPM" /></a>
<a href="https://t.me/nestjs_mod" target="_blank"><img src="https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000" alt="Telegram Group"/></a>
</p>

## Description

This repository contains modules prepared for the application launched via [NestJS-mod](https://github.com/nestjs-mod).

Some modules are written from scratch, and some are a wrapped version of existing [NestJS](https://nestjs.com/) modules.

Types of modules (list in order of processing):

- [`Core modules`](https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/core) - Core modules necessary for the operation of feature and integration modules (examples: main module with connection to the database, main module for connecting to aws, etc.).
- [`Feature modules`](https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/feature) - Feature modules with business logic of the application.
- [`Integration modules`](https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/integration) - Integration modules are necessary to organize communication between feature or core modules (example: after creating a user in the UsersModule feature module, you need to send him a letter from the NotificationsModule core module).
- [`System modules`](https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/system) - System modules necessary for the operation of the entire application (examples: launching a NestJS application, launching microservices, etc.).
- [`Infrastructure modules`](https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/libs/infrastructure) - Infrastructure modules are needed to create configurations that launch various external services (examples: docker-compose file for raising a database, gitlab configuration for deploying an application).

## Getting started

### Create new application

Commands for create empty NestJS-mod application

```bash
# Create empty nx project
npx --yes create-nx-workspace@17.2.8 --name=project-name --preset=empty --interactive=false --nx-cloud=false

# Go to created project
cd project-name

# Install all need main dev-dependencies
npm install --save-dev @nestjs-mod/schematics@latest

# Create NestJS-mod application
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true
```

Start created application

```bash
# Start application in dev mode
npm run serve:dev:app-name

# Build and start application in prod mode

## Build
npm run build:prod:app-name

## Start
npm run start:prod:app-name
```

### Create new library

Commands for create empty NestJS-mod library

```bash
# Create NestJS-mod library
./node_modules/.bin/nx g @nestjs-mod/schematics:library feature-name --buildable --publishable --directory=libs/feature-name --simpleName=true --projectNameAndRootFormat=as-provided --strict=true
```

Add created library to `apps/app-name/src/main.ts`

```ts

// Example without options
bootstrapNestApplication({
  ...
  modules: {
    feature: [FeatureName.forRoot()],
  }
});

// Example with options
bootstrapNestApplication({
  ...
  modules: {
    feature: [FeatureName.forRoot({
      configuration: { optionsName: 'options name' },
    })],
  }
});


// By default, in the example, the application looks for env by the key `APP_NAME_ENV_NAME`, but you can override it, for example:
bootstrapNestApplication({
  ...
  modules: {
    feature: [FeatureName.forRoot({
      environments: { envName: 'env name' },
    })],
  }
});
```

### Create an infrastructure report

You can generate a report for all modules and their configurations.

```bash
# Generate markdown report
npm run docs:infrastructure
```

After which the file `INFRASTRUCTURE.MD` appear in the application folder `apps/app-name`.

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)

## Questions

For questions and support please use the official [Telegram group](https://t.me/nestjs_mod). The issue list of this repo is **exclusively** for bug reports and feature requests.

## Stay in touch

- Author - [Ilshat Khamitov](https://t.me/KaufmanEndy)

## License

[MIT licensed](LICENSE).
