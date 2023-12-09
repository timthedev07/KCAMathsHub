declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      DATABASE_URL: string;
      NEXTAUTH_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      S3_BUCKET_NAME: string;
      S3_CLOUDFRONT_DOMAIN: string;
      CLOUDFRONT_PRIVATE_KEY: string;
      CLOUDFRONT_KEY_PAIR_ID: string;
      CLOUDFRONT_DISTRIBUTION_ID: string;
    }
  }
}

export {}
