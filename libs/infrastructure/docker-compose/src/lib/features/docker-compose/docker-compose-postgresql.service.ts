import { Injectable } from '@nestjs/common';
import { DockerComposePostgresEnvironments } from './docker-compose-postgresql.settings';

@Injectable()
export class DockerComposePostgresService {
  constructor(private readonly dockerComposePostgresEnvironments: DockerComposePostgresEnvironments) {}

  getDockerComposePostgresEnvironments() {
    return this.dockerComposePostgresEnvironments;
  }
}
