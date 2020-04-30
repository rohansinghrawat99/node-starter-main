import { ApiErrorCode, HttpException } from "./http.exception";

export class MethodNotFoundException extends HttpException {
    static MESSAGE = "this method is not supported on the endpoint.";

    constructor() {
        super(MethodNotFoundException.MESSAGE, ApiErrorCode.GENERAL_NOT_FOUND, 405);
    }
}
