
export default ({ env }) => ({
    ...(process.env.APP_ENV !== 'no-s3' &&
    {
        upload: {
            config: {
                provider: 'aws-s3',
                providerOptions: {
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
                {
                    uid: 'api::home.home',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: '',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::contact-zoo.contact-zoo',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'contact-zoo',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::documents-page.documents-page',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'documents',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::documents-category.documents-category',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'documents',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::document.document',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'documents',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::header.header',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: '',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::news-page.news-page',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'news',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::news-collection.news-collection',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'news',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
                {
                    uid: 'api::visiting-rules-page.visiting-rules-page',
                    draft: {
                        url: `${env('FRONTEND_URL')}/api/preview`,
                        query: {
                            slug: 'visiting-rules',
                            secret: env('PREVIEW_SECRET')
                        },
                        openTarget: 'StrapiPreviewPage',
                    },
                },
            ]
        }
    },
});
