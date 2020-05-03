import { ApiErrorCode } from "../root/http.exception";
import { ModelAlreadyExistsException } from "../root/model-already-exists.exception";

export class UserAlreadyExistsException extends ModelAlreadyExistsException {

  constructor() {
    super("User Already Exists!", ApiErrorCode.USER_ALREADY_EXISTS);
  }
}