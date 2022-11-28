import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./1-models/error-model";
import DeviceRouter from "./4-controllers/device-controller";
import ScenarioRouter from "./4-controllers/scenario-controller";
import UserRouter from "./4-controllers/user-controller";
import catchAll from "./5-middleware/catchAll";
import config from "./6-utils/config";
import mySql_init from "./6-utils/init";

const server = express();

mySql_init();

server.use(cors());
server.use(express.json());
server.use("/api/device", DeviceRouter);
server.use("/api/scenario", ScenarioRouter);
server.use("/api/user", UserRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);
server.listen(config.port, () =>
  console.log("listening on port " + config.port)
);
