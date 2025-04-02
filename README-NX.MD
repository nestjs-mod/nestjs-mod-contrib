# Commands

## Create library

```
./node_modules/.bin/nx g @nestjs-mod/schematics:library --buildable --publishable --directory=libs/infrastructure/docker-compose --simpleName=true --strict=true

./node_modules/.bin/nx g @nestjs-mod/schematics:library --buildable --publishable --directory=libs/core/keyv --simpleName=true --strict=true

./node_modules/.bin/nx g @nx/angular:library --directory=libs/core/sso-angular
```

## Create application

```
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/example-cache-manager --name=example-cache-manager --strict=true

./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/example-keyv --name=example-keyv --strict=true

./node_modules/.bin/nx g @nx/angular:application --directory=apps/example-minio-angular --name=example-minio-angular --strict=true --minimal=true --prefix=app --style=less --ssr=true --viewEncapsulation=None --e2eTestRunner=none --bundler=webpack
```

## Remove library

```
./node_modules/.bin/nx g @nx/workspace:remove common
```

## Remove application

```
./node_modules/.bin/nx g @nx/workspace:remove example-basic

./node_modules/.bin/nx g @nx/workspace:remove example-keyv-e2e
```
