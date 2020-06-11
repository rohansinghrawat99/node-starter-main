import { Request, Response } from "express";
import { userService } from "../services/entities/user.service";
import { UserTransformer } from "../transformers/user.transformer";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";
import { UserCreateDto } from "../dtos/user/user-create.dto";
import { UserAlreadyExistsException } from "../exceptions/user/user-already-exists.exception";
import { UserCreateValidator } from "../validators/user/user-create.validator";
import { UnprocessableEntityException } from "../exceptions/root/unprocessable-entity.exception";
import { UserLoginDto } from "../dtos/user/user-login.dto";
import { UserLoginValidator } from "../validators/user/user-login.validator";
import { WrongPasswordException } from "../exceptions/user/wrong-password.exception";
import * as jsonwebtoken from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { ENV_JWT_SECRET } from "../util/secrets.util";

export class UserController {
 static async index(req: Request, res: Response) {
   const users = await userService.index();

   return res.json({
     data: await (new UserTransformer().transformList(users))
   });
 }

  static async showById(req: Request, res: Response) {
   const userId = +req.params.id;
    const user = await userService.showById(userId);

    if (!user) {
      throw new UserNotFoundException();
    }

    return res.json({
      data: await (new UserTransformer().transform(user))
    });
  }

  static async showByEmail(req: Request, res: Response) {
   const email = req.body.email;
    const user = await userService.showByEmail(email);

    if (!user) {
      throw new UserNotFoundException();
    }

    return res.json({
      data: await (new UserTransformer().transform(user))
    });
  }

  static async signUp(req: Request, res: Response) {
   const inputData = req.body as UserCreateDto;

   try {
     await (new UserCreateValidator().validate(inputData));
   }
   catch (e) {
     throw new UnprocessableEntityException(e);
   }

   const user = await userService.showByEmail(inputData.email);

   if (user) {
     throw new UserAlreadyExistsException();
   }

   const newUser = await userService.create(inputData);

   return res.json({
     data: await (new UserTransformer().transform(newUser))
   });
  }

  static async login(req: Request, res: Response) {
   const inputData = req.body as UserLoginDto;

   try {
     await (new UserLoginValidator().validate(inputData));
   }
   catch (e) {
     throw new UnprocessableEntityException(e);
   }

    const user = await userService.showByEmail(inputData.email);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordCorrect = bcrypt.compareSync(inputData.password, user.password);

    if (!isPasswordCorrect) {
      throw new WrongPasswordException();
    }

    return res.json({
      token: jsonwebtoken.sign({
        data: user.id
      }, ENV_JWT_SECRET, {expiresIn: "1h"}),

      user: await (new UserTransformer().transform(user))
    });

  }
}