import { ValidatorAbstract, ValidatorService } from "request-validator-node";

export class UserLoginValidator extends ValidatorAbstract {
  protected getValidatorInstance(): ValidatorService {
    return ValidatorService.init({}); // Optional: Enter folder where request schema files are placed or pass {}
  }

  protected getSchemaName(): string {
    return "schema/user/user-login.schema.json";
  }
}