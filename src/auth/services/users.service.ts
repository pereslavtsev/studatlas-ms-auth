import { Injectable } from '@nestjs/common';
import { AuthenticationClient, ManagementClient, ManagementClientOptions, User, SignInToken } from 'auth0';
import { InjectConfig } from 'nestjs-config';

@Injectable()
export class UsersService {
  private readonly management;
  private readonly auth0;

  constructor(@InjectConfig() private readonly config) {
    const { domain, clientId, clientSecret }: ManagementClientOptions = config.get('auth0');
    this.management = new ManagementClient({
      domain,
      clientId,
      clientSecret,
    });
    this.auth0 = new AuthenticationClient({
      domain,
      clientId,
      clientSecret,
    });
  }

  create(): Promise<User> {
    return this.management.createUser();
  }

  async getById(id: string): Promise<User> {
    const { access_token }: SignInToken = await this.auth0.clientCredentialsGrant({
      audience: `https://studatlas.eu.auth0.com/api/v2/`,
    })
    console.log(access_token)
    return this.management.getUser({ id });
  }

  update() {}

  remove(id: string) {
    return this.management.deleteUser({ id });
  }
}
