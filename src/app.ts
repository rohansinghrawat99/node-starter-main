import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { errorHandler } from "./handlers/error-handler";

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


app.get("/test", errorHandler((req: Request, res: Response) => {
    return res.json({
        "success": true
    });
}));

app.listen(port, () => console.log(`The app is running on port ${port}`));