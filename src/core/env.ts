import dotenv from 'dotenv';

let isEnvLoaded = false;

type RequiredEnvKey =
  | 'SF_BASE_URL'
  | 'SF_USERNAME'
  | 'SF_PASSWORD'
  | 'SF_SECURITY_TOKEN'
  | 'SF_CLIENT_ID'
  | 'SF_CLIENT_SECRET'
  | 'SF_STD_USERNAME'
  | 'SF_STD_PASSWORD'
  | 'SF_STD_TOKEN';

type UiEnv = {
  baseUrl: string;
  username: string;
  password: string;
  securityToken: string;
};

type ApiEnv = UiEnv & {
  clientId: string;
  clientSecret: string;
};

type StandardUserEnv = {
  username: string;
  password: string;
  securityToken: string;
};

export function loadEnv(): void {
  if (!isEnvLoaded) {
    dotenv.config();
    isEnvLoaded = true;
  }
}

function getRequiredEnv(name: RequiredEnvKey): string {
  loadEnv();
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function hasEnv(...names: RequiredEnvKey[]): boolean {
  loadEnv();
  return names.every((name) => Boolean(process.env[name]));
}

export function getOptionalUiEnv(): UiEnv | null {
  if (!hasEnv('SF_BASE_URL', 'SF_USERNAME', 'SF_PASSWORD', 'SF_SECURITY_TOKEN')) {
    return null;
  }

  return {
    baseUrl: getRequiredEnv('SF_BASE_URL'),
    username: getRequiredEnv('SF_USERNAME'),
    password: getRequiredEnv('SF_PASSWORD'),
    securityToken: getRequiredEnv('SF_SECURITY_TOKEN'),
  };
}

export function getUiEnv(): UiEnv {
  return {
    baseUrl: getRequiredEnv('SF_BASE_URL'),
    username: getRequiredEnv('SF_USERNAME'),
    password: getRequiredEnv('SF_PASSWORD'),
    securityToken: getRequiredEnv('SF_SECURITY_TOKEN'),
  };
}

export function getApiEnv(): ApiEnv {
  const uiEnv = getUiEnv();

  return {
    ...uiEnv,
    clientId: getRequiredEnv('SF_CLIENT_ID'),
    clientSecret: getRequiredEnv('SF_CLIENT_SECRET'),
  };
}

export function getStandardUserEnv(): StandardUserEnv {
  return {
    username: getRequiredEnv('SF_STD_USERNAME'),
    password: getRequiredEnv('SF_STD_PASSWORD'),
    securityToken: getRequiredEnv('SF_STD_TOKEN'),
  };
}
