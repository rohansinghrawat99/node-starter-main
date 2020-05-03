import { Sequelize } from "sequelize-typescript";
import { ENV_MYSQL_DB, ENV_MYSQL_HOSTNAME, ENV_MYSQL_PASSWORD, ENV_MYSQL_USER } from "../util/secrets.util";
import logger from "../util/logger.util";
import { User } from "../models/user.model";
import sequelize from "sequelize";

class DBService {
  private _sequelize: Sequelize;

  private constructor() {
    logger.silly("[NodeStarter] DBService");
    this._sequelize = new Sequelize({
      dialect  : "mysql",
      host     : ENV_MYSQL_HOSTNAME,
      database : ENV_MYSQL_DB,
      username : ENV_MYSQL_USER,
      password : ENV_MYSQL_PASSWORD,
      logging  : false,
      benchmark: false
    });

    this._sequelize.addModels([
      User
    ]);
  }

  static getInstance(): DBService {
    return new DBService();
  }

  async rawQuery(sql: string | { query: string, values: any[] }, options?: sequelize.QueryOptions): Promise<any> {
    return this._sequelize.query(sql, options);
  }

  getSequelize(): Sequelize {
    return this._sequelize;
  }
}

export const dbService = DBService.getInstance();
