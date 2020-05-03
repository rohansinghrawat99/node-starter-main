import { User } from "../models/user.model";
import { Dictionary } from "async";
import { Helpers } from "../util/helpers.util";
import { TransformerAbstract } from "./base/transformer.abstract";

export class UserTransformer extends TransformerAbstract<User> {

  protected _map(user: User): Dictionary<any> {
    return {
      id        : user.id,
      first_name: user.first_name,
      last_name : Helpers.replaceUndefinedWithNull(user.last_name),
      email: user.email,
      mobile_number: user.mobile_number,
      role    : user.role,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }
}