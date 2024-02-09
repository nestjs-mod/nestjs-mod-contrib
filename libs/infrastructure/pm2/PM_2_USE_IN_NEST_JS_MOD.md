An example you can see the full example here https://github.com/nestjs-mod/nestjs-mod-contrib/tree/master/apps/example-terminus.

```typescript
import { PACKAGE_JSON_FILE, ProjectUtils, bootstrapNestApplication } from '@nestjs-mod/common';
import { ECOSYSTEM_CONFIG_FILE, Pm2 } from '@nestjs-mod/pm2';
import { join } from 'path';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-terminus');

bootstrapNestApplication({
  globalEnvironmentsOptions: { debug: true },
  globalConfigurationOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(appFolder, PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, '.env'),
        },
      }),
    ],
    infrastructure: [
      Pm2.forRoot({
        configuration: {
          ecosystemConfigFile: join(rootFolder, ECOSYSTEM_CONFIG_FILE),
          applicationScriptFile: join('dist/apps/example-terminus/main.js'),
        },
      }),
    ],
  },
});
```

After connecting the module to the application and `npm run build` and starting generation of documentation through `npm run docs:infrastructure`, you will have new files and scripts to run.

New scripts mostly `package.json`

```json
{
  "scripts": {
    "_____pm2 prod infra_____": "_____pm2 prod infra_____",
    "pm2:start": "./node_modules/.bin/pm2 start ./ecosystem.config.json",
    "pm2:stop": "./node_modules/.bin/pm2 delete all"
  },
  "scriptsComments": {
    "pm2:start": ["Launch all applications in PM2 mode"],
    "pm2:stop": ["Stop all applications in PM2 mode"]
  }
}
```

Config file for start all built applications `ecosystem.config.json`

```json
{
  "apps": [
    { "name": "terminus", "script": "node ./dist/apps/example-terminus/main.js", "node_args": "-r dotenv/config" }
  ]
}
```
