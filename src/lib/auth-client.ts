import ky from 'ky';
import { Session } from 'next-auth';

import env from '@/lib/env';

const authClient = ky.create({
  prefixUrl: env('NEXT_PUBLIC_NEXTAUTH_URL'),
});

export const getClientSession = () => authClient.get('session').json<Session>();
