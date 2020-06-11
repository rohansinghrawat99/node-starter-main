import logger from "../../util/logger.util";
import { User } from "../../models/user.model";
import { UserCreateDto } from "../../dtos/user/user-create.dto";


class UserService {
  private constructor() {
    logger.silly("[node-starter] UserService");
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
      ...data
    });
  }
}

export const userService = UserService.getInstance();