"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const utils_1 = require("./utils");
const assertUrlProtocol = (url) => {
    // Regex to test protocol like "http://", "https://"
    return /^\w*:\/\//.test(url);
};
const getConfig = ({ baseUrl, rootPath, s3Options, ...legacyS3Options }) => {
    if (Object.keys(legacyS3Options).length > 0) {
        process.emitWarning("S3 configuration options passed at root level of the plugin's providerOptions is deprecated and will be removed in a future release. Please wrap them inside the 's3Options:{}' property.");
    }
    const credentials = (0, utils_1.extractCredentials)({ s3Options, ...legacyS3Options });
    const config = {
        ...s3Options,
        ...legacyS3Options,
        ...(credentials ? { credentials } : {}),
    };
    config.params.ACL = (0, fp_1.getOr)(client_s3_1.ObjectCannedACL.public_read, ['params', 'ACL'], config);
    return config;
};
module.exports = {
    init({ baseUrl, rootPath, s3Options, ...legacyS3Options }) {
        // TODO V5 change config structure to avoid having to do this
        const config = getConfig({ baseUrl, rootPath, s3Options, ...legacyS3Options });
        const s3Client = new client_s3_1.S3Client(config);
        const filePrefix = rootPath ? `${rootPath.replace(/\/+$/, '')}/` : '';
        const getFileKey = (file) => {
            const path = file.path ? `${file.path}/` : '';
            return `${filePrefix}${path}${file.hash}${file.ext}`;
        };
        const upload = async (file, customParams = {}) => {
            const fileKey = getFileKey(file);
            const uploadObj = new lib_storage_1.Upload({
                client: s3Client,
                params: {
                    Bucket: config.params.Bucket,
                    Key: fileKey,
                    Body: file.stream || Buffer.from(file.buffer, 'binary'),
                    ACL: config.params.ACL,
                    ContentType: file.mime,
                    ...customParams,
                },
            });
            const upload = (await uploadObj.done());
            if (assertUrlProtocol(upload.Location)) {
                file.url = baseUrl ? `${baseUrl}/${fileKey}` : upload.Location;
            }
            else {
                // Default protocol to https protocol
                file.url = `https://${upload.Location}`;
            }
        };
        return {
            isPrivate() {
                return config.params.ACL === 'private';
            },
            async getSignedUrl(file, customParams) {
                // Do not sign the url if it does not come from the same bucket.
                if (!(0, utils_1.isUrlFromBucket)(file.url, config.params.Bucket, baseUrl)) {
                    return { url: file.url };
                }
                const fileKey = getFileKey(file);
                const url = await (0, s3_request_presigner_1.getSignedUrl)(
                // @ts-ignore - TODO fix client type
                s3Client, new client_s3_1.GetObjectCommand({
                    Bucket: config.params.Bucket,
                    Key: fileKey,
                    ...customParams,
                }), {
                    expiresIn: (0, fp_1.getOr)(15 * 60, ['params', 'signedUrlExpires'], config),
                });
                return { url };
            },
            uploadStream(file, customParams = {}) {
                return upload(file, customParams);
            },
            upload(file, customParams = {}) {
                return upload(file, customParams);
            },
            delete(file, customParams = {}) {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: config.params.Bucket,
                    Key: getFileKey(file),
                    ...customParams,
                });
                return s3Client.send(command);
            },
        };
    },
};
