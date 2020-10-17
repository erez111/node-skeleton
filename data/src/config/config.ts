export const Config = {
  environment: process.env.NODE_ENV || 'development',
  swaggerPath: 'docs',
  // eslint-disable-next-line radix
  port: (process.env.PORT && parseInt(process.env.PORT)) ? parseInt(process.env.PORT) : 3100,
};
