import { SupabaseService } from '@nestjs-mod/supabase';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isAxiosError } from 'axios';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(private readonly supabaseService: SupabaseService) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  getTokenFromHeader(headers?: Record<string, string>) {
    try {
      return Object.entries(headers || {}).map(([key, value]) => [key.toLowerCase(), value]).find(([key, value]) => key === 'authorization')?.[1]?.split('Bearer ')?.[1]
    } catch (er) {
      return ''
    }
  }

  async getProfile(headers?: Record<string, string>) {
    try {
      const profileResult = await this.supabaseService.getSupabaseClient().auth.getUser(this.getTokenFromHeader(headers))
      return profileResult.data
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }


  async signIn(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<string | undefined> {
    try {
      const signupUserResult = await this.supabaseService.getSupabaseClient().auth.signInWithPassword({
        password: user.password,
        email: user.email.toLowerCase(),
      });
      return signupUserResult.data?.session?.access_token;
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Unhandled error', HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: {
    username?: string;
    password: string;
    email: string;
  }): Promise<void | null> {
    try {
      const signupUserResult = await this.supabaseService.getSupabaseClient().auth.signUp({
        password: user.password,
        email: user.email.toLowerCase()
      });

      if (signupUserResult.data.user && signupUserResult.data.user.email) {
        await this.verifyUser({
          externalUserId: signupUserResult.data.user.id!,
          email: signupUserResult.data.user.email,
        });
      }

      this.logger.debug(
        `User with email: ${signupUserResult.data.user?.email} successfully created!`
      );
    } catch (err) {
      if (isAxiosError(err)) {
        this.logger.debug(err.response?.data);
        this.logger.debug(err, err.stack);
        if (err.response?.data?.message) {
          throw new HttpException(err.response?.data?.message, HttpStatus.BAD_REQUEST);
        }
      }
      throw new HttpException('Failed to create a user', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyUser({
    externalUserId,
    email,
  }: {
    externalUserId: string;
    email: string;
  }) {
    // for auto verify set in "https://supabase.com/dashboard/project/asuvykozhdurwmnfdhwj/auth/providers?provider=Email - Confirm email" to false
    return this;
  }
}
