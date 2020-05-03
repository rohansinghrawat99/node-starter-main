import { ValidatorAbstract, ValidatorService } from "request-validator-node";

export class UserCreateValidator extends ValidatorAbstract {
  protected getValidatorInstance(): ValidatorService {
    return ValidatorService.init({}); // Optional: Enter folder where request schema files are placed or pass {}
  }

  protected getSchemaName(): string {
    return "src/schema/user/user-create.schema.json";
  }
}