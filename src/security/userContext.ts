export interface SalesforceUser{
     username: string;
  password: string;
  securityToken: string;
  profile: 'ADMIN' | 'STANDARD';

}

export const users={
    admin:{
         username: process.env.SF_ADMIN_USERNAME!,
    password: process.env.SF_ADMIN_PASSWORD!,
    securityToken: process.env.SF_ADMIN_TOKEN!,
    profile: 'ADMIN',

    },
     standard: {
    username: process.env.SF_STD_USERNAME!,
    password: process.env.SF_STD_PASSWORD!,
    securityToken: process.env.SF_STD_TOKEN!,
    profile: 'STANDARD',
  },
};