import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';

dotenv.config();

type JwtPayload = {
  sub: string; // e.g. "auth0|abc123" or "google-oauth2|xyz"
  iss: string;
  aud: string | string[];
  scope?: string;
  email?: string;
  name?: string;
};

export interface JwtUser {
  userId: string;
  provider: string;
  providerId: string;
  sub: string;
  scopes: string[];
}

function splitSub(sub: string) {
  // "provider|id" → { provider, providerId }
  const [provider, ...rest] = sub.split('|');
  return { provider, providerId: rest.join('|') };
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `${process.env.AUTH0_ISSUER_URL}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    // You can see the JWT here
    console.log('JWT payload', payload);

    const { sub } = payload;
    const { provider, providerId } = splitSub(sub);

    // 1) Find Authentication by provider+providerId
    let auth = await this.prisma.authentication.findFirst({
      where: { provider, providerId },
      include: { user: true },
    });

    // 2) If missing, create User + Authentication (using whatever claims we have)
    if (!auth) {

    const names = (payload['name'] || 'User').split(' ');
    const firstName = names[0] || 'User';
    const lastName = names.slice(1).join(' ') || 'Account';
    const email = payload['email'] || `${providerId}@auth0.user`;

    const newUser = await this.prisma.users.create({
      data: {
        firstName,
        lastName,
        email,
        emailVerified: new Date(),
        authentications: {
          create: {
            provider,
            providerId,
            },
          },
        },
      include: { authentications: true },
      });

      auth = { ...newUser.authentications[0], user: newUser };
    }
    
    return {
      userId: auth.userId,
      provider,
      providerId,
      sub,
      scopes: (payload.scope ?? '').split(' ').filter(Boolean),
    } as JwtUser;
  }
}