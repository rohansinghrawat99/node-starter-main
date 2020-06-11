import { Dictionary } from "async";
import * as _ from "lodash";
import logger from "../../util/logger.util";

export abstract class TransformerAbstract<T> {

  protected defaultIncludes: string[] = [];

  async transform(model: T, includes?: string[]): Promise<Dictionary<any>> {
    return await this._mapModelWithIncludes(model, includes && includes.length ? includes : this.defaultIncludes);
  }

  async transformList(models: T[], includes?: string[]): Promise<Dictionary<any>[]> {
    const transformedPromises = models.map(model => {
      return this._mapModelWithIncludes(model, includes ? includes : this.defaultIncludes);
    });

    return await Promise.all(transformedPromises);
  }

  protected abstract _map(model: T): Dictionary<any>;

  private async _mapModelWithIncludes(model: T, includes?: string[]): Promise<Dictionary<any>> {
    let mappedModel = this._map(model);

    if (includes) {
      const includePromises = includes.map(i => this._addInclude(model, i));

      const responses = await Promise.all(includePromises);

      responses.forEach(res => {
        mappedModel = {
          ...mappedModel,
          ...res
        };
      });
    }

    return mappedModel;
  }

  private async _addInclude(model: T, include: string): Promise<any> {
    const camelCaseName = _.camelCase(include);
    const methodName    = "include" + camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
    const result        = await (this as any)[methodName](model);

    try {
      return {
        [include]: result
      };
    } catch (e) {
      logger.crit(methodName + " not Found");
    }
  }
}
