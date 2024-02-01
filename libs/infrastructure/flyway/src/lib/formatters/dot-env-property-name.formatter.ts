import {
  DotEnvPropertyNameFormatter,
  EnvModelOptions,
  EnvModelPropertyOptions,
  EnvModelRootOptions,
  defaultContextName,
} from '@nestjs-mod/common';
import { constantCase } from 'case-anything';

export const CLEAR_WORDS = ['NESTJS', 'NEST', 'ENVIRONMENTS', 'ENVIRONMENT'];

export function getFlywayDotEnvPropertyNameFormatter(flywayFeatureName: string) {
  class FlywayDotEnvPropertyNameFormatter extends DotEnvPropertyNameFormatter {
    override format({
      modelOptions,
      propertyOptions,
      modelRootOptions,
    }: {
      modelRootOptions?: EnvModelRootOptions;
      modelOptions: EnvModelOptions;
      propertyOptions: EnvModelPropertyOptions;
    }) {
      const prepareFullname = [
        defaultContextName() !== modelRootOptions?.name && modelRootOptions?.name ? modelRootOptions?.name : null,
        !modelRootOptions?.name?.endsWith(flywayFeatureName) ? flywayFeatureName : '',
        defaultContextName() !== modelOptions?.name && modelOptions?.name ? modelOptions?.name : null,
        String(propertyOptions.name ?? propertyOptions.originalName),
      ]
        .filter(Boolean)
        .map((v: string | null) => {
          v = constantCase(v!);
          for (const word of CLEAR_WORDS) {
            v = v.replace(word, '');
          }
          return v;
        })
        .join('_');

      return prepareFullname.split('_').filter(Boolean).join('_');
    }
  }
  return new FlywayDotEnvPropertyNameFormatter();
}
