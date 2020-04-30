import * as shell from "shelljs";

// TODO Add then back after fixing server permissions.
shell.cp(".env", "dist/.env");
shell.cp("-R", "schema", "dist/schema");