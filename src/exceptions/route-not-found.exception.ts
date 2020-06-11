import { ApiErrorCode, HttpException } from "./root/http.exception";

export class RouteNotFoundException extends HttpException {
  static MESSAGE = "Endpoint doesn't exist.";

  constructor() {
    super(RouteNotFoundException.MESSAGE, ApiErrorCode.GENERAL_NOT_FOUND, 404);
  }
}