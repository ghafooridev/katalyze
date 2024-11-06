import { Account, AuthOptions, getServerSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CognitoProvider from 'next-auth/providers/cognito';

import { getClientSession } from '@/lib/auth-client';
import { rotateAccessToken } from '@/lib/oauth';

export const isExpired = (token: JWT) => Date.now() > token.expiresAt * 1000;
export const getExpiresAt = (expiresIn: number) => Math.floor(Date.now() / 1000) + expiresIn;
export const jwtCallback = async ({
  token,
  account,
}: {
  token: JWT;
  account: Account | null;
}) => {
  if (account) {
    return {
      ...token,
      expiresAt: account.expires_at,
      accessToken: account.access_token,
      refreshToken: account.refresh_token,
      idToken: account.id_token,
    } as JWT;
  }
  if (isExpired(token)) {
    const resp = await rotateAccessToken(token.refreshToken);

    return {
      ...token,
      expiresAt: getExpiresAt(resp.expires_in),
      accessToken: resp.access_token,
      idToken: resp.id_token,
    };
  }

  return token;
};
export const sessionCallback = ({ session, token }) => ({ ...session, token });

export const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID || '',
      clientSecret: process.env.COGNITO_CLIENT_SECRET || '',
      issuer: process.env.COGNITO_ISSUER,
      checks: 'nonce',
      httpOptions: {
        timeout: 8_000,
      },
    }),
  ],

  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
};

export const getAuthSession = () => {
  if (typeof window === 'undefined') {
    return getServerSession(authOptions);
  }
  return getClientSession();
};
