import {
  getNestModuleDecorators,
  getNestModuleInternalUtils,
  getRequestFromExecutionContext,
} from '@nestjs-mod/common';
import { Reflector } from '@nestjs/core';

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SSO_MODULE } from './sso.constants';
import { CheckAccessOptions, SsoRequest } from './sso.types';

export const { InjectService: InjectSsoService } = getNestModuleDecorators({
  moduleName: SSO_MODULE,
});

export const {
  getServiceToken: getSsoServiceToken,
  getEnvironmentsLoaderToken: getSsoEnvironmentsLoaderToken,
} = getNestModuleInternalUtils({
  moduleName: SSO_MODULE,
});

export const AllowEmptySsoUser = Reflector.createDecorator();

export const CheckSsoAccess = Reflector.createDecorator<CheckAccessOptions>();


export const CurrentSsoUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromExecutionContext(ctx) as SsoRequest;
    return request.ssoUser;
  }
);

export const CurrentSsoUserToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromExecutionContext(ctx) as SsoRequest;

    return request?.headers?.authorization?.split(' ')[1];
  }
);
