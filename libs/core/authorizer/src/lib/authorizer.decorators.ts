import {
  getNestModuleDecorators,
  getNestModuleInternalUtils,
  getRequestFromExecutionContext,
} from '@nestjs-mod/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZER_MODULE_NAME } from './authorizer.constants';

export const { InjectService: InjectAuthorizerService } =
  getNestModuleDecorators({
    moduleName: AUTHORIZER_MODULE_NAME,
  });

export const {
  getServiceToken: getAuthorizerServiceToken,
  getEnvironmentsLoaderToken: getAuthorizerEnvironmentsLoaderToken,
} = getNestModuleInternalUtils({
  moduleName: AUTHORIZER_MODULE_NAME,
});

export const AllowEmptyUser = Reflector.createDecorator();

export const CheckAccess = Reflector.createDecorator<CheckAccessOptions>();

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthorizerRequest, CheckAccessOptions } from './authorizer.types';

export const CurrentAuthorizerUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromExecutionContext(ctx) as AuthorizerRequest;
    return request.authorizerUser;
  }
);
