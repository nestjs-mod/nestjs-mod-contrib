import { User } from '@authorizerdev/authorizer-js';

export type AuthorizerUser = Partial<User>;

export type CheckAccessOptions = {
  roles?: string[];
  permissions: string[];
  types?: string[];
};

export type AuthorizerRequest = {
  authorizerUser?: AuthorizerUser;
  externalUserId?: string;
  externalAppId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers?: any;
};
