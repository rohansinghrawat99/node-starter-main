import { ApiErrorCode } from "./root/http.exception";
import { UnauthorizedException } from "./root/unauthorized.exception";

export class InvalidJwtTokenException extends UnauthorizedException {

  constructor() {
    super("Invalid Token", ApiErrorCode.JWT_INVALID);
  }
}