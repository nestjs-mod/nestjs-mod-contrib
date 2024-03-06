import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthorizerService } from './authorizer.service';

@Injectable()
export class AuthorizerGuard implements CanActivate {
  constructor(private readonly authorizerService: AuthorizerService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await this.authorizerService.getUserFromRequest(context);
    return true;
  }
}
