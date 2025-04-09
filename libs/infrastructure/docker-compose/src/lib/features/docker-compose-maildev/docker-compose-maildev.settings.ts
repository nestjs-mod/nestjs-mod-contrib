import { ConfigModel, ConfigModelProperty, EnvModel, EnvModelProperty, NumberTransformer } from '@nestjs-mod/common';

@ConfigModel()
export class DockerComposeMaildevConfiguration {
  @ConfigModelProperty({
    description: 'Docker image name',
    default: 'maildev/maildev:2.2.1',
  })
  image?: string;

  @ConfigModelProperty({
    description: 'Feature name for generate prefix to environments keys',
  })
  featureName?: string;

  @ConfigModelProperty({
    description: 'Network, if not set networkNames have project name and driver=bridge.',
  })
  networks?: { name: string; driver: string }[];

  @ConfigModelProperty({
    description: 'SMTP port to catch mail',
    default: 1025,
    transform: new NumberTransformer(),
  })
  smtpPort?: number;

  @ConfigModelProperty({
    description: 'Port to run the Web GUI.',
    default: 1080,
    transform: new NumberTransformer(),
  })
  webPort?: number;
}

@EnvModel()
export class DockerComposeMaildevEnvironments {
  @EnvModelProperty({
    description: 'Directory for persisting mail.',
    hidden: true,
  })
  maildevMailDirectory?: string;

  @EnvModelProperty({
    description: 'Switch from http to https protocol.',
    hidden: true,
  })
  maildevHttps?: string;

  @EnvModelProperty({
    description: 'The file path to the ssl private key.',
    hidden: true,
  })
  maildevHttpsKey?: string;

  @EnvModelProperty({
    description: 'The file path to the ssl cert file.',
    hidden: true,
  })
  maildevHttpsCert?: string;

  @EnvModelProperty({
    description: 'IP Address to bind SMTP service to, defaults to :: (any IPv4/v6).',
    hidden: true,
  })
  maildevIp?: string;

  @EnvModelProperty({
    description: 'SMTP host for outgoing mail.',
    hidden: true,
  })
  maildevOutgoingHost?: string;

  @EnvModelProperty({
    description: 'SMTP port for outgoing mail.',
    hidden: true,
  })
  maildevOutgoingPort?: string;

  @EnvModelProperty({
    description: 'SMTP user for outgoing mail.',
    hidden: true,
  })
  maildevOutgoingUser?: string;

  @EnvModelProperty({
    description: 'SMTP password for outgoing mail.',
    hidden: true,
    hideValueFromOutputs: true,
  })
  maildevOutgoingPass?: string;

  @EnvModelProperty({
    description: 'Use SMTP SSL for outgoing mail.',
    hidden: true,
  })
  maildevOutgoingSecure?: string;

  @EnvModelProperty({
    description: 'Use auto-relay mode. Optional relay email address.',
    hidden: true,
  })
  maildevAutoRelay?: string;

  @EnvModelProperty({
    description: 'Filter rules for auto relay mode.',
    hidden: true,
  })
  maildevAutoRelayRules?: string;

  @EnvModelProperty({
    description: 'SMTP user for incoming mail.',
    hidden: true,
  })
  maildevIncomingUser?: string;

  @EnvModelProperty({
    description: 'SMTP password for incoming mail.',
    hidden: true,
    hideValueFromOutputs: true,
  })
  maildevIncomingPass?: string;

  @EnvModelProperty({
    description: 'Use SMTP SSL for incoming emails.',
    hidden: true,
  })
  maildevIncomingSecure?: string;

  @EnvModelProperty({
    description: 'Cert file location for incoming SSL.',
    hidden: true,
  })
  maildevIncomingCert?: string;

  @EnvModelProperty({
    description: 'Key file location for incoming SSL.',
    hidden: true,
  })
  maildevIncomingKey?: string;

  @EnvModelProperty({
    description: 'IP Address to bind HTTP service to, defaults to --ip.',
    hidden: true,
  })
  maildevWebIp?: string;

  @EnvModelProperty({
    description: 'HTTP user for GUI.',
    hidden: true,
  })
  maildevWebUser?: string;

  @EnvModelProperty({
    description: 'HTTP password for GUI.',
    hidden: true,
    hideValueFromOutputs: true,
  })
  maildevWebPass?: string;

  @EnvModelProperty({
    description: 'Base path for URLs.',
    hidden: true,
  })
  maildevBasePathname?: string;

  @EnvModelProperty({
    description: 'Disable the use of the web interface. Useful for unit testing.',
    hidden: true,
  })
  maildevDisableWeb?: string;

  @EnvModelProperty({
    description: 'Comma separated list of SMTP extensions to NOT advertise (SMTPUTF8, PIPELINING, 8BITMIME).',
    hidden: true,
  })
  maildevHideExtensions?: string;
}
