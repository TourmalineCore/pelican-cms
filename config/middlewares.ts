export default () => [
  'strapi::logger',
  'strapi::errors',
  process.env.APP_ENV === 'no-s3'
    ? 'strapi::security'
    : {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              '*',
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'market-assets.strapi.io',
              '*',
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
