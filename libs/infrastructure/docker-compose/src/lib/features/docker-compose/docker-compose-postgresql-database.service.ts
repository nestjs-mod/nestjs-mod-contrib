import { WrapApplicationOptionsService } from '@nestjs-mod/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConnectionString } from 'connection-string';
import { DockerComposeServiceType, createDockerComposeServiceName } from '../../docker-compose.utils';
import { ManualDockerComposeFeatures } from '../../manual-docker-compose.service';
import { DockerComposePostgresService } from './docker-compose-postgresql.service';

@Injectable()
export class DockerComposePostgresDatabaseService implements OnModuleInit {
  constructor(
    private readonly dockerComposePostgresService: DockerComposePostgresService,
    private readonly manualDockerComposeFeatures: ManualDockerComposeFeatures,
    private readonly wrapApplicationOptionsService: WrapApplicationOptionsService
  ) {}

  onModuleInit() {
    const serviceName = createDockerComposeServiceName(
      this.wrapApplicationOptionsService.project?.name,
      DockerComposeServiceType.PostgreSQL
    );
    const root = this.parseDatabaseUrl(
      this.dockerComposePostgresService.getDockerComposePostgresEnvironments().rootDatabaseUrl
    );
    this.manualDockerComposeFeatures.addManualDockerComposeFeatureConfiguration({
      services: {
        [serviceName]: {
          environment: {
            POSTGRESQL_USERNAME: root.USERNAME!,
            POSTGRESQL_PASSWORD: root.PASSWORD!,
            POSTGRESQL_DATABASE: root.DATABASE!,
          },
        },
      },
    });
  }

  parseDatabaseUrl(databaseUrl: string): {
    USERNAME?: string;
    PASSWORD?: string;
    HOST?: string;
    DATABASE?: string;
    SCHEMA?: string;
    SCHEMAS?: string;
    PORT?: number;
  } {
    if (!databaseUrl) {
      return {};
    }
    const cs = new ConnectionString(databaseUrl);
    const USERNAME = cs.user;
    const PASSWORD = cs.password;
    const PORT = cs.port;
    const HOST = cs.hosts && cs.hosts[0].toString();
    const DATABASE = cs.path && cs.path[0];
    const SCHEMA = cs.params && cs.params['schema'];
    const SCHEMAS = cs.params && cs.params['schemas'];
    return { USERNAME, PASSWORD, HOST, DATABASE, SCHEMA, SCHEMAS, PORT };
  }
}
