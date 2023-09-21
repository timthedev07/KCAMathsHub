declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_AUTH_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
}

export {}
