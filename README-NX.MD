# Commands

## Create library

```
./node_modules/.bin/nx g @nestjs-mod/schematics:library docker-compose --buildable --publishable --directory=libs/infrastructure/docker-compose --simpleName=true --projectNameAndRootFormat=as-provided --strict=true
```

## Create application

```
npm run nx -- g @nx/nest:application --directory=apps/example-basic --name=example-basic
```

## Remove library

```
npm run nx -- g @nx/workspace:remove common
```

## Remove application

```
npm run nx -- g @nx/workspace:remove example-basic
```
