export class HttpException extends Error {

  /**
   * Message in english that explains the error
   *
   * It should be directly addressed to user
   * as in most cases this will be displayed to user.
   */
  message: string;

  /**
   * App Specific error code that uniquely identifies an error
   *
   * e.g. => When Requesting a specific entity with a specific id,
   * If it is not found, there should be a unique id associated with it
   * and using which frontend should redirect user back to the previous page
   */
  errorCode: number;

  /**
   * Http status code
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
   */
  statusCode: number;

  /**
   * Any additional data associated with a specific error.
   *
   * e.g. => Login API might want to send
   * number of attempts left on incorrect password
   */
  meta?: any;

  /**
   * Validation errors thrown by AJV
   * send as it is being thrown by the library...
   */
  errors?: any;

  constructor(message: string, errorCode: ApiErrorCode, statusCode: number, meta?: any, errors?: any) {
    super(message);

    this.message    = message;
    this.errorCode  = errorCode;
    this.statusCode = statusCode;

    this.meta   = meta;
    this.errors = errors;
  }
}


export enum ApiErrorCode {

  // User Related
  USER_NOT_FOUND                    = 101,
  USER_ALREADY_EXISTS               = 102,
  USER_DEACTIVATED                  = 103,
  WRONG_PASSWORD                    = 104,
  CANNOT_DELETE_SELF                = 105,
  ROLE_NOT_ASSIGNED                 = 106,

  ANNOUNCEMENT_NOT_FOUND,

  CLIENT_NOT_FOUND,

  MARKET_NOT_FOUND,
  MARKET_ALREADY_EXISTS,

  NO_ACCESS_ERROR,

  LEAD_NOT_FOUND,
  LEAD_DATE,


  ROLE_NOT_FOUND,
  CANNOT_UPDATE_SELF_ROLE,
  CANNOT_CHANGE_SELF_ROLE,

  PROJECT_NOT_FOUND,
  TEMPLATE_NOT_FOUND,
  STATE_NOT_FOUND,
  OPTION_NOT_FOUND,
  QUESTION_CATEGORY_NOT_FOUND,

  MAILING_LIST_NOT_FOUND,

  SAFETY_OBSERVATION_CATEGORY_NOT_FOUND,

  SAFETY_OBSERVATION_ISSUE_NOT_FOUND,
  TROUBLE_TICKET_CATEGORY_NOT_FOUND,

  TROUBLE_TICKET_URGENCY_NOT_FOUND,

  SITE_MAP_NOT_FOUND,

  DISTRIBUTION_LIST_NOT_FOUND,

  COMPLIANCE_REQUEST_NOT_FOUND,
  COMPLIANCE_REQUEST_ALREADY_INSPECTED,

  PROJECT_STOP_REQUEST_NOT_FOUND,
  PROJECT_STOP_REQUEST_ALREADY_ACCEPTED,
  PROJECT_STOP_REQUEST_ALREADY_REJECTED,

  WEEKLY_ALERT_NOT_FOUND,

  PROJECT_REQUEST_NOT_FOUND,

  INSPECTION_FREQUENCY_NOT_FOUND,

  PROJECT_PHASE_NOT_FOUND,

  SAFETY_TRADE_NOT_FOUND,

  WEATHER_CONDITION_NOT_FOUND,
  SAFETY_INSPECTION_NOT_FOUND,
  SITE_INSPECTION_NOT_FOUND,
  RESPONSIVE_ACTION_ITEM_NOT_FOUND,
  DISCHARGE_POINT_NOT_FOUND,

  UPLOADED_FILE_NOT_FOUND,
  ATTACHMENT_NOT_FOUND,
  UPLOADED_REPORT_NOT_FOUND,
  UPLOADED_REPORT_ATTACHMENT_NOT_FOUND,
  TROUBLE_TICKET_NOT_FOUND,
  TROUBLE_TICKET_ATTACHMENT_NOT_FOUND,

  FOLDER_NOT_FOUND,

  INSPECTION_NOT_FOUND,

  ENERGY_INSPECTION_NOT_FOUND,

  GENERAL_THROTTLING                = 8101,
  GENERAL_NOT_FOUND                 = 8102,
  START_DATE_MUST_BE_AFTER_END_DATE = 8103,

  // JWT
  JWT_INVALID                       = 9101,
  JWT_INCORRECT_PAYLOAD_TYPE        = 9102,
  VALIDATION_ERROR                  = 9998,

  UNKNOWN                           = 9999 // Reserved...
}
