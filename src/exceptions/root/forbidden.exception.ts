import { ApiErrorCode, HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
    constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
        super(message, errorCode, 403, meta);
    }
}
