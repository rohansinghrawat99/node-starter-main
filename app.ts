import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as _ from "lodash";
import { dbService } from "./services/db.service";
import * as Sentry from "@sentry/node";
import { APP_IDENTIFIER, ENV_APP_PORT_REST, ENV_SENTRY_DSN, IS_PRODUCTION } from "./util/secrets.util";
import { userService } from "./services/entities/user.service";
import { cryptService } from "./services/factories/crypt.service";
import { jwtService } from "./services/factories/jwt.service";
import { validatorService } from "./services/factories/validator.service";
import { mattermostService } from "./services/mattermost.service";
import { s3Service } from "./services/factories/s3.service";
import { UserController } from "./controllers/user.controller";
import { roleService } from "./services/entities/role.service";
import { userMiddleware } from "./middlewares/user.middleware";
import { RoleController } from "./controllers/role.controller";
import { Helpers } from "./util/helpers.util";
import { RouteNotFoundException } from "./exceptions/route-not-found.exception";
import { errorHandler } from "./handlers/error-handler";
import { cronService } from "./services/factories/cron.service";
import helpers from "handlebars-helpers";
import * as handlebars from "handlebars";
import moment from "moment";
import { UploadController } from "./controllers/upload.controller";
import helmet from "helmet";
const compression = require("compression");

const appErrorHandler = require("errorhandler");

export class Application {
  private readonly APP: express.Application;
  private readonly PORT: number;
  private readonly ALLOWED_ORIGINS = [
    "http://localhost:4200",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ];

  constructor(port: number) {
    this.APP  = express();
    this.PORT = port;

    this.initSentry();
    this.setupCORS();
    this.initHandleBars();
    this.initServices();
    this.initGlobalMiddleware();
    this.initRoutes();
  }

  initSentry() {
    if (IS_PRODUCTION) {
      Sentry.init({
        dsn       : ENV_SENTRY_DSN,
        serverName: APP_IDENTIFIER
      });
      this.APP.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
      this.APP.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);
    }
  }

  initHandleBars() {
    helpers({
      handlebars: handlebars
    });
    handlebars.registerHelper("unslugify", (value: string) => {
      return Helpers.unslugify(value);
    });
    handlebars.registerHelper("ternary", function (test, yes, no) {
      return test ? yes : no;
    });
    handlebars.registerHelper("char", (n: number) => {
      if (n < 26) {
        return String.fromCharCode(65 + n) + ". ";
      }
      if (n >= 26 && n < 52) {
        n = n - 26;
        return String.fromCharCode(97 + n) + ". ";
      }
      return n - 51 + ". ";
    });
    handlebars.registerHelper("dateDiff", (date1?: string, date2?: string) => {
      return moment(date1 ? date1 : undefined).diff(moment(date2 ? date2 : undefined), "days");
    });
  }

  initRoutes() {
    // Static Public Content
    this.APP.use("/public", express.static("public", {maxAge: 31557600000}));

    this.APP.get("/test", errorHandler((req: express.Request, res: express.Response) => {
      return res.json({
        "success": true
      });
    }));
    this.APP.post("/login", errorHandler(UserController.authenticate));
    this.APP.get("/me", [userMiddleware], errorHandler(UserController.me));
    this.APP.put("/me", [userMiddleware], errorHandler(UserController.updateMe));
    this.APP.put("/upload-profile-image", [userMiddleware], errorHandler(UserController.uploadProfileImage));
    this.APP.post("/forgot-password", errorHandler(UserController.forgotPassword));
    this.APP.post("/reset-password", errorHandler(UserController.resetPasswordByCode));
    this.APP.post("/change-password", [userMiddleware], errorHandler(UserController.changePassword));
    this.APP.post("/signup", errorHandler(UserController.signup));

    // USER
    this.APP.get("/users", [userMiddleware], errorHandler(UserController.indexUsers));
    this.APP.post("/users", [userMiddleware], errorHandler(UserController.createUser));
    this.APP.put("/users/:userId([0-9]+)", [userMiddleware], errorHandler(UserController.updateUser));
    this.APP.delete("/users/:userId([0-9]+)", [userMiddleware], errorHandler(UserController.deleteUser));
    this.APP.get("/users/:userId([0-9]+)", [userMiddleware], errorHandler(UserController.showUser));


    // ROLE
    this.APP.get("/roles", [userMiddleware], errorHandler(RoleController.indexRoles));
    this.APP.post("/roles", [userMiddleware], errorHandler(RoleController.createRole));
    this.APP.get("/roles/:roleId([0-9]+)", [userMiddleware], errorHandler(RoleController.showRole));
    this.APP.put("/roles/:roleId([0-9]+)", [userMiddleware], errorHandler(RoleController.updateRole));
    this.APP.delete("/roles/:roleId([0-9]+)", [userMiddleware], errorHandler(RoleController.deleteRole));

    // UPLOAD
    this.APP.post("/signed-url", [userMiddleware], errorHandler(UploadController.getPreSignedUrl));

    this.APP.all("*", (req: express.Request, res: express.Response) => Helpers.handleError(res, new RouteNotFoundException()));
  }

  start(): void {
    this.APP.listen(this.PORT, () => {
      console.log(`App Started on PORT: ${this.PORT}`);
    });
  }

  private setupCORS(): void {
    this.APP.use(cors({
      origin        : (origin, callback) => {
        if (!origin || _.includes(this.ALLOWED_ORIGINS, origin)) {
          callback(undefined, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods       : [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE"
      ],
      exposedHeaders: ["Content-Disposition"]
    }));
    this.APP.options("*");
  }

  // Express configuration
  private initGlobalMiddleware(): void {
    this.APP.set("port", process.env.PORT || ENV_APP_PORT_REST);
    this.APP.use(helmet());
    this.APP.use(bodyParser.json());
    this.APP.use(bodyParser.urlencoded({extended: true}));
    this.APP.use(compression({
      level: 3
    }));

    if (IS_PRODUCTION) {
      this.APP.use(appErrorHandler());
    }
  }

  private initServices(): void {
    // Entities
    roleService;
    userService;

    // Factories
    cryptService;
    jwtService;
    s3Service;
    validatorService;

    // Others
    dbService;
    mattermostService;
    cronService;
  }
}


