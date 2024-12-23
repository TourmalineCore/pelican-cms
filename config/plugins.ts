import Minio = require('minio');

export default ({ env }) => {
    const minioClient = new Minio.Client({
        endPoint: env('MINIO_ENDPOINT', 'play.min.io'),
        port: parseInt(env('MINIO_PORT', '9000'), 10),
        useSSL: env.bool('MINIO_SSL', true),
        accessKey: env('MINIO_ACCESS_KEY'),
        secretKey: env('MINIO_SECRET_KEY')
    });


    const bucketName = env('MINIO_BUCKET', 'pelican-local-env');
    const policy = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetBucketLocation",
                    "s3:ListBucket"
                ],
                "Resource": "arn:aws:s3:::" + bucketName
            },
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::" + bucketName + "/*"
            }
        ]
    };

    const setupMinio = async () => {
        try {
            const bucketExists = await minioClient.bucketExists(bucketName);
            if (!bucketExists) {
                await minioClient.makeBucket(bucketName, 'us-east-1');
                console.log(`Bucket ${bucketName} created successfully.`);
                await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
                console.log(`Public access policy set for bucket ${bucketName}.`);
            } else {
                await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
                console.log(`Bucket ${bucketName} already exists.`);
            }
        } catch (err) {
            console.error('Error setting up Minio bucket:', err);
        }
    };


    setupMinio();

    return {
        ...(process.env.APP_ENV !== 'no-s3' && {
            upload: {
                config: {
                    provider: 'aws-s3',
                    providerOptions: {

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
            },
        }),
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
                    plugins: [],
                },
            },
        },
        "content-versioning": {
            enabled: true,
        },
        'preview-button': {
            config: {
                contentTypes: [
                    {
                        uid: 'api::home.home',
                        draft: {
                            url: env('FRONTEND_PREVIEW_URL'),
                            query: {
                                slug: '{slug}',
                                version: '{versionNumber}',
                                secret: env('PREVIEW_SECRET'),
                            },
                            openTarget: '_blank',
                            alwaysVisible: true,
                        },
                        published: {
                            url: env('FRONTEND_URL'),
                            openTarget: '_blank',
                        },
                    },
                ]
            }
        },
    };
};