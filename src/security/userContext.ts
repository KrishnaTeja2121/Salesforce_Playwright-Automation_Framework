import { getStandardUserEnv } from '../core/env';

export interface SalesforceUser {
  username: string;
  password: string;
  securityToken: string;
  profile: 'STANDARD';
}

export function getStandardUser(): SalesforceUser {
  const env = getStandardUserEnv();

  return {
    username: env.username,
    password: env.password,
    securityToken: env.securityToken,
    profile: 'STANDARD',
  };
}
