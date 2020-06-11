import { ApiErrorCode } from "../root/http.exception";
import { ForbiddenException } from "../root/forbidden.exception";

export class NoAccessException extends ForbiddenException {
  constructor() {
    super("You don't have sufficient permissions to access this resource", ApiErrorCode.NO_ACCESS_ERROR);
  }
}