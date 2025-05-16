process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import {
  bootstrapNestApplication,
  DefaultNestApplicationInitializer,
  DefaultNestApplicationListener,
  InfrastructureMarkdownReportGenerator,
  isInfrastructureMode,
  PACKAGE_JSON_FILE,
  ProjectUtils,
} from '@nestjs-mod/common';
import { SupabaseModule } from '@nestjs-mod/supabase';
import { join } from 'path';
import { AppModule } from './app/app.module';

const rootFolder = join(__dirname, '..', '..', '..');
const appFolder = join(rootFolder, 'apps', 'example-supabase');

bootstrapNestApplication({
  globalConfigurationOptions: { debug: true },
  globalEnvironmentsOptions: { debug: true },
  modules: {
    system: [
      ProjectUtils.forRoot({
        staticConfiguration: {
          applicationPackageJsonFile: join(__dirname, '..', '..', '..', 'apps/example-supabase', PACKAGE_JSON_FILE),
          packageJsonFile: join(rootFolder, PACKAGE_JSON_FILE),
          envFile: join(rootFolder, 'apps', 'example-supabase', '.env'),
        },
      }),
      DefaultNestApplicationInitializer.forRoot(),
      DefaultNestApplicationListener.forRoot({
        staticConfiguration: {
          // When running in infrastructure mode, the backend server does not start.
          mode: isInfrastructureMode() ? 'silent' : 'listen',
        },
      }),
    ],
    feature: [
      SupabaseModule.forRootAsync({
        staticEnvironments: {
          url: 'https://asuvykozhdurwmnfdhwj.supabase.co',
          key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdXZ5a296aGR1cndtbmZkaHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjQ1MTksImV4cCI6MjA2MjkwMDUxOX0.Xe0eHD_cNhiMGaKfwP53-_0XhZ09oaC5OKQ4gsPbwV0'
        },
      }),
      AppModule.forRoot()
    ],
    infrastructure: [
      InfrastructureMarkdownReportGenerator.forRoot({
        staticConfiguration: {
          markdownFile: join(appFolder, 'INFRASTRUCTURE.MD'),
          skipEmptySettings: true,
          style: 'pretty',
        },
      }),
    ],
  },
});
