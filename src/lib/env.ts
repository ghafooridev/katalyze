/* eslint-disable no-underscore-dangle */
function isBrowser() {
  return Boolean(typeof window !== 'undefined' && window.__env);
}
type EnvKey =
  | 'NEXT_PUBLIC_API_BASE_URL'
  | 'NEXT_PUBLIC_HOTJAR_ID'
  | 'NEXT_PUBLIC_NEXTAUTH_URL';

export function env(key: EnvKey): string {
  if (isBrowser()) {
    return window.__env[key] || '';
  }

  return process.env[key] || '';
}
export default env;
