import * as jsonwebtoken from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
import { ENV_JWT_SECRET } from "../util/secrets.util";
import { InvalidJwtTokenException } from "../exceptions/invalid-jwt-token.exception";
import { userService } from "../services/entities/user.service";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";
import { InternalException } from "../exceptions/root/internal.exception";
import { NextFunction, Request, Response } from "express";
import { Helpers } from "../util/helpers.util";
import { ApiErrorCode } from "../exceptions/root/http.exception";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.headers.authorization;

  try {
    const payload = jsonwebtoken.decode(jwtToken, {json: true});

    if (!(jsonwebtoken.verify(jwtToken, ENV_JWT_SECRET))) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    }

    const userId = payload.data;
    const user   = await userService.showById(userId);

    if (!user) {
      return Helpers.handleError(res, new UserNotFoundException());
    }
    req.user = user;
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      return Helpers.handleError(res, new InvalidJwtTokenException());
    } else {
      return Helpers.handleError(res, new InternalException(e.message, ApiErrorCode.UNKNOWN, e.stack));
    }
  }

  next();
};