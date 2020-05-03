import { Dictionary } from "async";
import { Response } from "express";
import { isUndefined } from "util";
import { HttpException } from "../exceptions/root/http.exception";
import * as _ from "lodash";
import moment from "moment";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid"; // For version 5


export class Helpers {
  public static generateRandomString(length = 8, options: {
    start?: string
    includeUpperCase: boolean,
    includeLowerCase: boolean,
    includeNumbers: boolean
    includeSpecialCharacters?: boolean
  }) {
    let text = options.start || "";

    const startLength     = text.length;
    const remainingLength = length - text.length;

    if (remainingLength <= 0) {
      // Original String is already
      // greater than required length
      return text;
    }

    let dictionary = "";

    if (options.includeLowerCase) {
      dictionary += "abcdefghijklmnopqrstuvwxyz";
    }

    if (options.includeUpperCase) {
      dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (options.includeNumbers) {
      dictionary += "1234567890";
    }

    if (options.includeSpecialCharacters) {
      dictionary += "!@#$%^&*()";
    }

    for (let i = 1; i < length; i++) {
      text += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
    }

    return text;
  }


  /**
   * Ideally, the parameter type any should be replaced by typeof T but the compiler (TS 2.4) can"t understand this syntax.
   * @param enumRef
   * @returns {T[]}
   */
  public static iterateEnum<T>(enumRef: any): T[] {
    return Object.keys(enumRef).map(key => enumRef[key]);
  }

  public static checkInEnum<T>(enumRef: any, value: T): boolean {
    return Object.keys(enumRef)
      .filter(k => isNaN(Number(k))) // Removing reverse mapping in numeric enums.
      .filter(k => enumRef[k] === value).length > 0;
  }

  public static replaceUndefinedWithNull(object: any) {
    if (isUndefined(object)) {
      return null;
    }
    return object;
  }

  public static handleError(res: Response, exception: HttpException): void {
    res.statusCode = exception.statusCode;
    res.json({
      code   : exception.errorCode,
      message: exception.message,
      errors : exception.errors
    });

    return;
  }

  public static slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/[\s-]+/g, "_");
  }

  public static unslugify(input: string): string {
    if (!input) {
      return null;
    }
    return Helpers.titlecase(input.replace(new RegExp("_", "g"), " "));
  }

  public static titlecase(input: string): string {
    if (!input) {
      return null;
    }
    return input.split(" ")
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
  }

  public static getExtensionFromString(input: string) {
    if (!input) {
      return null;
    }
    // console.log("http://localhost:3000/public/uploads/site-map/logo-1580820198553.png".substring("http://localhost:3000/public/uploads/site-map/logo-1580820198553.png".lastIndexOf(".") + 1));
    return input.substring(input.lastIndexOf(".") + 1);
  }

  public static getFilesizeInMB(path: string): number {
    try {
      const stats = fs.statSync(path);
      const size  = stats["size"] / 1000000.0;
      console.log(size);
      return size;
    } catch (e) {
      console.error(e);
      return 0;
    }
  }


  public static generateCronTimeFromDaysAndDate(day: string, time: string): string {
    const minutes = moment(time, ["h:mm A"]).get("minutes");
    const hours   = moment(time, ["h:mm A"]).get("hours");
    return `0 ${minutes} ${hours} * * ${day.substring(0, 3)}`;
  }

  public static isJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static getFileFromPath(path: string) {

  }
}
