import { ENV_APP_PORT_REST } from "./util/secrets.util";
import { Application } from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */

const app = new Application(ENV_APP_PORT_REST);
app.start();