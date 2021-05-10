import "reflect-metadata";
import bodyParser from "body-parser";
import express from "express";
// import { createConnection } from "typeorm";
import { RegisterRoutes } from "../build/routes";

export const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

RegisterRoutes(app);

// createConnection()
//   .then(async (connection) => {
//     console.log("Inserting a new address into the database...");
//     const address = new StreetAddress();
//     address.firstName = "Timber";
//     address.lastName = "Saw";
//     address.age = 25;
//     await connection.manager.save(address);
//     console.log("Saved a new address with id: " + address.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(StreetAddress);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");
//   })
//   .catch((error) => console.log(error));
