import { NextFunction, Request, Response } from "express";
import { Role } from "../util/enum.util";
import { Helpers } from "../util/helpers.util";
import { NoAccessException } from "../exceptions/user/no-access.exception";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user.role != Role.ADMIN) {
    return Helpers.handleError(res, new NoAccessException());
  }
  next();
};