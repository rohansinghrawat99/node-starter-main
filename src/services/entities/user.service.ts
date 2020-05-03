import logger from "../../util/logger.util";
import { User } from "../../models/user.model";
import { UserCreateDto } from "../../dtos/user/user-create.dto";
import { Role } from "../../util/enum.util";

class UserService {
  private constructor() {
    logger.silly("[SurfSide] UserService");
  }

  static getInstance(): UserService {
    return new UserService();
  }

  async index(): Promise<User[]> {
    return User.findAll();
  }

  async showById(id: number): Promise<User> {
    return User.findByPk(id);
  }

  async showByEmail(email: string): Promise<User> {
    return User.findOne({
      where: {
        email: email
      }
    });
  }

  async create(data: UserCreateDto): Promise<User> {
    return User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      mobile_number: data.mobile_number,
      role: data.role
    });
  }
}

export const userService = UserService.getInstance();