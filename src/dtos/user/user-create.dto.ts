import { Role } from "../../util/enum.util";

export interface UserCreateDto {
  first_name: string,
  last_name: string,
  email: string,
  mobile_number: string,
  role: Role
}