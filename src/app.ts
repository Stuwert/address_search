import "reflect-metadata";
import bodyParser from "body-parser";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
// import { createConnection } from "typeorm";
import { RegisterRoutes } from "../build/routes";
import { ValidateError } from "@tsoa/runtime";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

RegisterRoutes(app);

// Implemented From: https://tsoa-community.github.io/docs/error-handling.html#setting-up-error-handling
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
