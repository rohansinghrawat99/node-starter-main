import { User } from "../models/user.model";

declare module "express" {

  export interface Request {
    user: User;
  }
}
