import { AuthorizerService } from '@nestjs-mod/authorizer';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { adminSecret } from './app.constants';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly authorizerService: AuthorizerService) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getProfile(headers?: Record<string, string>) {
    return this.authorizerService.getProfile(headers)
  }


  async signIn(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<string | undefined> {
    const signupUserResult = await this.authorizerService.login({
      password: user.password,
      email: user.email.toLowerCase(),
    });
    return signupUserResult.data?.access_token;
  }

  async signUp(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<void | null> {
    const signupUserResult = await this.authorizerService.signup({
      nickname: user.username,
      password: user.password,
      confirm_password: user.password,
      email: user.email.toLowerCase(),
      roles: ['user'],
    });
    if (signupUserResult.errors.length > 0) {
      this.logger.error(
        signupUserResult.errors[0].message,
        signupUserResult.errors[0].stack
      );
      if (
        !signupUserResult.errors[0].message.includes('has already signed up')
      ) {
        throw new HttpException(signupUserResult.errors[0].message, HttpStatus.BAD_REQUEST);
      }
    } else {
      if (!signupUserResult.data?.user) {
        throw new HttpException('Failed to create a user', HttpStatus.BAD_REQUEST);
      }

      await this.verifyUser({
        externalUserId: signupUserResult.data.user.id,
        email: signupUserResult.data.user.email,
      });

      this.logger.debug(
        `User with email: ${signupUserResult.data.user.email} successfully created!`
      );
    }
  }

  async verifyUser({
    externalUserId,
    email,
  }: {
    externalUserId: string;
    email: string;
  }) {
    await this.updateUser(externalUserId, { email_verified: true, email });
    return this;
  }

  async updateUser(
    externalUserId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params: Partial<Record<string, any>>
  ) {
    if (Object.keys(params).length > 0) {
      const paramsForUpdate = Object.entries(params)
        .map(([key, value]) =>
          typeof value === 'boolean' ? `${key}: ${value}` : `${key}: "${value}"`
        )
        .join(',');
      const updateUserResult = await this.authorizerService.graphqlQuery({
        query: `mutation {
  _update_user(params: { 
      id: "${externalUserId}", ${paramsForUpdate} }) {
    id
  }
}`,
        headers: { ['x-admin-secret']: adminSecret }
      });

      if (updateUserResult.errors.length > 0) {
        this.logger.error(
          updateUserResult.errors[0].message,
          updateUserResult.errors[0].stack
        );
        throw new HttpException(updateUserResult.errors[0].message, HttpStatus.BAD_REQUEST);
      }
    }
  }
}
