export const PDF_CSS = "<style> table { border: 1px solid #ccc; border-collapse: collapse; margin: 0; padding: 0; width: 100%; table-layout: fixed; } table caption { font-size: 1.5em; margin: .5em 0 .75em; } table tr { background-color: #f8f8f8; border: 1px solid #ddd; padding: 5px; } table th, table td { padding: 5px; text-align: center; } td, th { word-break: break-all; white-space: pre-line; } table th { font-size: 12px; text-transform: uppercase; } </style>";

export const HEADER_ACCESS_TOKEN  = "x-access-token";
export const HEADER_AUTHORIZATION = "authorization";

export const USER_TYPE_USER      = "user";
export const USER_TYPE_MODERATOR = "moderator";

// We are not using prefix `ENV` here because
// it is used as a prefix for environment variables.
export const ENVIRONMENT_DEV        = "dev";
export const ENVIRONMENT_PRODUCTION = "production";

export const DIR_SCHEMA = "schema";
export const DIR_DIST   = "dist";

export const FILEPATH_ENV = ".env";

export const THREE_MONTHS = (3 * 30 * 24 * 60 * 60 * 1000);
export const ONE_DAY      = (24 * 60 * 60 * 1000);
