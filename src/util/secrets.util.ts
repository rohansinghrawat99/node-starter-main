import dotenv from "dotenv";

dotenv.config({path: ".env"});

export const ENVIRONMENT   = process.env.APP_ENV;
export const IS_PRODUCTION = ENVIRONMENT === "production"; // Anything else is treated as "dev"

export const APP_IDENTIFIER    = process.env.APP_IDENTIFIER;
export const ENV_APP_PORT_REST = +process.env.APP_PORT_REST;

export const ENV = process.env.APP_ENV;

export const ENV_BASE_URL      = process.env.BASE_URL;
export const ENV_DASHBOARD_URL = process.env.DASHBOARD_URL;

export const ENV_API_KEY  = process.env.API_KEY;
export const ENV_DOMAIN   = process.env.DOMAIN;
export const ENV_FROM_WHO = process.env.FROM_WHO;

export const ENV_MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const ENV_MYSQL_USER     = process.env.MYSQL_USER;
export const ENV_MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const ENV_MYSQL_DB       = process.env.MYSQL_DB;

export const ENV_S3_KEY    = process.env.S3_KEY;
export const ENV_S3_SECRET = process.env.S3_SECRET;
export const ENV_S3_BUCKET = process.env.S3_BUCKET;
export const ENV_S3_REGION = process.env.S3_REGION;

export const ENV_JWT_SECRET = process.env.JWT_SECRET;

export const ENV_ERROR_WEBHOOK = process.env.ERROR_WEBHOOK;

export const ENV_CRYPT_KEY = process.env.CRYPT_KEY;
export const ENV_CRYPT_IV  = process.env.CRYPT_IV;

export const ENV_AWS_ACCESS_TOKEN = process.env.AWS_ACCESS_TOKEN;

export const ENV_STANDARD_TEMPLATE_ID        = process.env.STANDARD_TEMPLATE_ID;
export const ENV_PULTE_STANDARD_TEMPLATE_ID  = process.env.PULTE_STANDARD_TEMPLATE_ID;
export const ENV_SAFETY_STANDARD_TEMPLATE_ID = process.env.SAFETY_STANDARD_TEMPLATE_ID;

export const ENV_REDIS_HOST     = process.env.REDIS_HOST;
export const ENV_REDIS_PORT     = process.env.REDIS_PORT;
export const ENV_REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export const ENV_SMTP_HOST      = process.env.SMTP_HOST;
export const ENV_SMTP_PORT      = process.env.SMTP_PORT;
export const ENV_SMTP_AUTH_USER = process.env.SMTP_AUTH_USER;
export const ENV_SMTP_AUTH_PASS = process.env.SMTP_AUTH_PASS;

export const ENV_STANDARD_TIMEZONE = process.env.STANDARD_TIMEZONE;
export const ENV_INTERNAL_EMAIL    = process.env.INTERNAL_EMAIL;
export const ENV_SENTRY_DSN        = process.env.SENTRY_DSN;

export const ENV_ACTIVE_DIRECTORY_DOMAIN   = process.env.ACTIVE_DIRECTORY_DOMAIN;
export const ENV_ACTIVE_DIRECTORY_BASEDN   = process.env.ACTIVE_DIRECTORY_BASEDN;
export const ENV_ACTIVE_DIRECTORY_USERNAME = process.env.ACTIVE_DIRECTORY_USERNAME;
export const ENV_ACTIVE_DIRECTORY_PASSWORD = process.env.ACTIVE_DIRECTORY_PASSWORD;




