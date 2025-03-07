
export default ({ env }) => ({
    ...(process.env.APP_ENV !== 'no-s3' &&
    {
        upload: {
            config: {
                provider: 's3-provider',
                providerOptions: {
                    // For kubernetes local env only
                    baseUrl: env('AWS_PUBLIC_ENDPOINT'),
                    s3Options: {
                        credentials: {
                            accessKeyId: env('AWS_ACCESS_KEY_ID'),
                            secretAccessKey: env('AWS_ACCESS_SECRET_KEY'),
                        },
                        endpoint: env('AWS_ENDPOINT'),
                        region: env('AWS_REGION'),
                        forcePathStyle: true,
                        params: {
                            ACL: env('AWS_ACL', 'public-read'),
                            Bucket: env('AWS_BUCKET'),
                        },
                    }
                },
            },
        }
    }),
    seo: {
        enabled: true,
    },
    documentation: {
        enabled: true,
        config: {
            openapi: '3.0.0',
            info: {
                version: '1.0.0',
                title: 'Документация API',
                description: '',
            },
            'x-strapi-config': {
                plugins: [], // Plugins that need documentation generation
            },
        },
    },
    'preview-button': {
        config: {
            contentTypes: [
                // Todo: comment out after adding the preview
                // {
                //     uid: 'api::home.home',
                //     draft: {
                //         url: env('FRONTEND_PREVIEW_URL'),
                //         query: {
                //             slug: '{slug}',
                //             version: '{versionNumber}',
                //             secret: env('PREVIEW_SECRET'),
                //         },
                //         openTarget: '_blank',
                //         alwaysVisible: true,
                //     },
                //     published: {
                //         url: env('FRONTEND_URL'),
                //         openTarget: '_blank',
                //     },
                // },
            ]
        }
    },
});
