import { ModelNotFoundException } from "./model-not-found.exception";
import { ApiErrorCode } from "./http.exception";

export class StartDateMustBeBeforeEndDateException extends ModelNotFoundException {
    constructor() {
        super("Start Date must be before End Date", ApiErrorCode.START_DATE_MUST_BE_AFTER_END_DATE);
    }
}