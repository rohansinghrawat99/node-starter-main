import { ApiErrorCode, HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
        super(message, errorCode, 401, meta);
    }
}
