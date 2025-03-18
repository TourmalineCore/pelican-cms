
export default ({ env }) => ({
    ...(process.env.APP_ENV !== 'no-s3' &&
    {
        upload: {
            config: {
                provider: 'aws-s3',
                providerOptions: {
                    // For kubernetes local env only
                    baseUrl: env('AWS_PUBLIC_ENDPOINT', 'http://localhost:9000/pelican-bucket'),
                    s3Options: {
                        credentials: {
                            accessKeyId: env('AWS_ACCESS_KEY_ID', 'admin'),
                            secretAccessKey: env('AWS_ACCESS_SECRET_KEY', 'rootPassword'),
                        },
                        endpoint: env('AWS_ENDPOINT', 'http://localhost:9000'),
                        region: env('AWS_REGION', 'us-east-1'),
                        forcePathStyle: true,
                        params: {
                            ACL: env('AWS_ACL', 'public-read'),
                            Bucket: env('AWS_BUCKET', 'pelican-bucket'),
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
