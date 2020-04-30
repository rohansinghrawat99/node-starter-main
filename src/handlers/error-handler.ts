import { NextFunction, Request, Response } from "express";
import { ApiErrorCode, HttpException } from "../exceptions/root/http.exception";
import { InternalException } from "../exceptions/root/internal.exception";
import logger from "../util/logger.util";
import * as Sentry from "@sentry/node";
import { IS_PRODUCTION } from "../util/secrets.util";

export const errorHandler = (method: Function) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await method(req, res, next);
  } catch (error) {
    let exception: HttpException;

    if (HttpException.prototype.isPrototypeOf(error)) {
      exception = error;
    } else {
      exception = new InternalException("Something went wrong...", ApiErrorCode.UNKNOWN, error);
      if (IS_PRODUCTION) {
        Sentry.captureException(error);
      }
    }
    console.error(error);
    logger.error(error);
    res.status(exception.statusCode).json({
      message: exception.message,
      code   : exception.errorCode,
      meta   : exception.meta,
      errors : exception.errors
    });
  }
};
