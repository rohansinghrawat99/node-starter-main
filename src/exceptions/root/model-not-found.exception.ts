import { ApiErrorCode, HttpException } from "./http.exception";

export class ModelNotFoundException extends HttpException {
    constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
        super(message, errorCode, 404, meta);
    }
}
