import { ApiErrorCode, HttpException } from "./http.exception";

export class ModelAlreadyExistsException extends HttpException {
    constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
        super(message, errorCode, 409, meta);
    }
}
