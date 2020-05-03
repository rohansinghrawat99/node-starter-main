import { ApiErrorCode } from "../root/http.exception";
import { ForbiddenException } from "../root/forbidden.exception";

export class WrongPasswordException extends ForbiddenException {

  constructor() {
    super("You have entered wrong credentials. Please check & enter correct credentials", ApiErrorCode.WRONG_PASSWORD);
  }
}
