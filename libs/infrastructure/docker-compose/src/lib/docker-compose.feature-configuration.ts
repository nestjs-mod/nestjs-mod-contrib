import { ConfigModel, ConfigModelProperty } from '@nestjs-mod/common';
import { Compose } from 'compose-spec-schema';
import {
  DefinitionsService,
  PropertiesConfigs,
  PropertiesNetworks,
  PropertiesSecrets,
  PropertiesVolumes,
} from 'compose-spec-schema/lib/type';

@ConfigModel()
export class DockerComposeFeatureConfiguration implements Compose {
  @ConfigModelProperty({
    description:
      'The top-level version property is defined by the Compose Specification for backward compatibility. It is only informative. @see https://github.com/compose-spec/compose-spec/blob/master/04-version-and-name.md',
  })
  version?: string;

  @ConfigModelProperty({
    description:
      'A service is an abstract definition of a computing resource within an application which can be scaled or replaced independently from other components. @see https://github.com/compose-spec/compose-spec/blob/master/05-services.md',
  })
  services?: {
    [k: string]: DefinitionsService & {
      /**
       * Since not all properties for services need to be selected from environment variables, in this property we will list the names of properties that will not be taken from environment variables and inserted as is (by default, all properties are taken from environment variables)
       */
      keysOfEnvironmentsWithStaticValue?: string[];
    };
  };

  @ConfigModelProperty({
    description:
      'Networks are the layer that allow services to communicate with each other. @see https://github.com/compose-spec/compose-spec/blob/master/06-networks.md',
  })
  networks?: PropertiesNetworks;

  @ConfigModelProperty({
    description:
      'Volumes are persistent data stores implemented by the container engine. @see https://github.com/compose-spec/compose-spec/blob/master/07-volumes.md',
  })
  volumes?: PropertiesVolumes;

  @ConfigModelProperty({
    description:
      'Secrets are a flavor of Configs focusing on sensitive data, with specific constraint for this usage. @see https://github.com/compose-spec/compose-spec/blob/master/09-secrets.md',
  })
  secrets?: PropertiesSecrets;

  @ConfigModelProperty({
    description:
      'Configs allow services to adapt their behaviour without the need to rebuild a Docker image. @see https://github.com/compose-spec/compose-spec/blob/master/08-configs.md',
  })
  configs?: PropertiesConfigs;
  [k: string]: unknown;
}
