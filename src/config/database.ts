import dotenv from "dotenv";
import { FILEPATH_ENV } from "../util/constants.util";

dotenv.config({path: FILEPATH_ENV}); // Required

export = {
  development: {
    username                 : process.env.MYSQL_USER,
    password                 : process.env.MYSQL_PASSWORD,
    database                 : process.env.MYSQL_DB,
    host                     : process.env.MYSQL_HOSTNAME,
    dialect                  : "mysql",
    migrationStorageTableName: "sequelize_meta"
  },
  production : {
    username                 : process.env.MYSQL_USER,
    password                 : process.env.MYSQL_PASSWORD,
    database                 : process.env.MYSQL_DB,
    host                     : process.env.MYSQL_HOSTNAME,
    dialect                  : "mysql",
    migrationStorageTableName: "sequelize_meta",
    seederStorage            : "sequelize",
    seederStorageTableName   : "sequelize_seed"
  }
};

