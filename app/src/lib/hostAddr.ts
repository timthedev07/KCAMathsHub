export const PROD_HOST = "https://kcamathshub.vercel.app";
export const DEV_HOST = "http://localhost:3000";

export const HOST =
  process.env.NODE_ENV === "development" ? DEV_HOST : PROD_HOST;
