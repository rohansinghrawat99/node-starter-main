import { ModelNotFoundException } from "../root/model-not-found.exception";
import { ApiErrorCode } from "../root/http.exception";

export class UserNotFoundException extends ModelNotFoundException {

  constructor() {
    super("User Not Found!", ApiErrorCode.USER_NOT_FOUND);
  }
}