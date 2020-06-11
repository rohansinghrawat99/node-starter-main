import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as _ from "lodash";
import { dbService } from "./services/db.service";
import { APP_IDENTIFIER, ENV_APP_PORT_REST, ENV_SENTRY_DSN, IS_PRODUCTION } from "./util/secrets.util";
import { userService } from "./services/entities/user.service";
import { UserController } from "./controllers/user.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { Helpers } from "./util/helpers.util";
import { RouteNotFoundException } from "./exceptions/route-not-found.exception";
import { errorHandler } from "./handlers/error-handler";
import { adminMiddleware } from "./middlewares/admin.middleware";

const compression = require("compression");

const appErrorHandler = require("errorhandler");

export class Application {
    private readonly APP: express.Application;
    private readonly PORT: number;
    private readonly ALLOWED_ORIGINS = [
        "http://localhost:4200",
        "https://dev.surfside.devslane.com",
        "https://stage.surfside.devslane.com",
        "https://dev.surfsidefoods.work",
        "https://staging.surfsidefoods.work"
    ];

    constructor(port: number) {
        this.APP  = express();
        this.PORT = port;

        this.setupCORS();
        this.initServices();
        this.initGlobalMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        // Static Public Content
        this.APP.use("/public", express.static("public", {maxAge: 31557600000}));

        this.APP.get("/test", errorHandler((req: express.Request, res: express.Response) => {
            return res.json({
                success: true
            });
        }));

        // PUBLIC APIS
        this.APP.post("/login", errorHandler(UserController.login));
        this.APP.post("/sign-up", errorHandler(UserController.signUp));
        // AUTHENTICATED APIS
        this.APP.get("/users", userMiddleware, adminMiddleware, errorHandler(UserController.index));
        this.APP.get("/users/:id([0-9]+)", userMiddleware, adminMiddleware, errorHandler(UserController.showById));
        this.APP.post("/users", userMiddleware, adminMiddleware , errorHandler(UserController.showByEmail));

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
        userService;

        // Factories

        // Others
        dbService;
    }
}


