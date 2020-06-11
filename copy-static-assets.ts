import * as shell from "shelljs";

shell.cp(".env", "dist/.env");
shell.cp("-R", "schema", "dist/schema");