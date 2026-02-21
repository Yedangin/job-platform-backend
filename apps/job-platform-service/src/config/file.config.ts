// src/config/file.config.ts
export default () => ({
  file: {
    storage: process.env.FILE_STORAGE as string, // 'local' or 's3' or 'gcp'
    local: {
      folder: process.env.LOCAL_FILE_FOLDER as string,
      baseUrl: process.env.LOCAL_FILE_BASE_URL as string,
    },
    s3: {
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
      baseUrl: process.env.S3_BASE_URL,
    },
  },
});
