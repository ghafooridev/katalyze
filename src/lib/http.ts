import ky, { BeforeRequestHook } from 'ky';

import { getAuthSession } from '@/lib/auth';

import env from './env';

const baseUrl = env('NEXT_PUBLIC_API_BASE_URL');
const url = new URL(baseUrl);
export const authorizationHook: BeforeRequestHook = async (request) => {
  const session = await getAuthSession();
  if (!session) {
    throw new Error('Session not found');
  }
  request.headers.set('Authorization', `Bearer ${session.token.idToken}`);
};

const kyInstance = ky.create({
  prefixUrl: url.toString(),
  cache: 'no-cache',
  hooks: {
    beforeRequest: [authorizationHook],
  },
});

export default kyInstance;
