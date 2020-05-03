import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Helpers } from "../util/helpers.util";
import { Role } from "../util/enum.util";
import * as bcrypt from "bcrypt";

@Table({
  timestamps: true,
  paranoid  : false,
  tableName : "users"
})
export class User extends Model<User> {

  @Unique
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column(DataType.STRING)
  email: string;

  @Column({
    type: DataType.STRING,
    set : function (this: User, value: string) {
      this.setDataValue("password", bcrypt.hashSync(value, 10));
    }
  })
  password: string;

  @Column(DataType.STRING)
  mobile_number: string;

  @Column(DataType.ENUM({values: Helpers.iterateEnum(Role)}))
  role: Role;
}
