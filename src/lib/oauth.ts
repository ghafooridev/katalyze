import ky from 'ky';

import { RotateAccessTokenResponse } from '@/types/OAuth';

const basicAuthHeader = `Basic ${btoa(
  `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`,
)}`;
const http = ky.create({
  prefixUrl: process.env.COGNITO_DOMAIN,
  headers: { Authorization: basicAuthHeader },
});
export const rotateAccessToken = (refreshToken: string) => http
  .post('oauth2/token', {
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.COGNITO_CLIENT_ID || '',
    }),
  })
  .json<RotateAccessTokenResponse>();
