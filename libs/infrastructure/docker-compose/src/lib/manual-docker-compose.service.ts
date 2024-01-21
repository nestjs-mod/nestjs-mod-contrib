import { Injectable } from '@nestjs/common';
import { DockerComposeFeatureConfiguration } from './docker-compose.feature-configuration';

@Injectable()
export class ManualDockerComposeFeatures {
  private manualDockerComposeFeatureConfigurations: DockerComposeFeatureConfiguration[] = [];

  addManualDockerComposeFeatureConfiguration(dockerComposeFeatureConfiguration: DockerComposeFeatureConfiguration) {
    this.manualDockerComposeFeatureConfigurations.push(dockerComposeFeatureConfiguration);
  }

  getManualDockerComposeFeatureConfigurations() {
    return this.manualDockerComposeFeatureConfigurations;
  }
}
