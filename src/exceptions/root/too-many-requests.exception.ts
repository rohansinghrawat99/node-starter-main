import { ApiErrorCode, HttpException } from "./http.exception";

export class TooManyRequestsException extends HttpException {
    private static MESSAGE = "Too many requests, please try again later.";

    constructor(
        message: string = TooManyRequestsException.MESSAGE,
        errorCode: ApiErrorCode = ApiErrorCode.GENERAL_THROTTLING,
        meta?: any) {

        super(message, errorCode, 429, meta);
    }
}
