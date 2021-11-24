import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1
      audience: `https://.eu.auth0.com/api/v2/`,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    });
  }

  validate(payload: any, done: VerifiedCallback): JwtPayload {
    if (!payload) {
      done(new UnauthorizedException(), false); // 2
    }

    return payload;
  }
}
