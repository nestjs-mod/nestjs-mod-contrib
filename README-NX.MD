# Commands

## Create library

```
npm run nx -- g @nx/nest:library common --buildable --publishable --directory=libs/common --simpleName=true
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
