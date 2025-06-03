import { TwoFactorCodeDto } from './generated/rest-dto/two-factor-code.dto';
import { TwoFactorUserDto } from './generated/rest-dto/two-factor-user.dto';

export enum TwoFactorEventEnum {
  GenerateCode = 'GenerateCode',
}

export interface TwoFactorEventContext {
  [TwoFactorEventEnum.GenerateCode]: {
    twoFactorUser: TwoFactorUserDto;
    twoFactorCode: TwoFactorCodeDto;
    code: string;
    repetition: boolean;
  };
  serviceId: string;
  type: string;
  operationName: string;
  externalUserId: string;
  externalTenantId: string;
}
