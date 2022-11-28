import { Router, Request, Response, NextFunction } from "express";
import DeviceModel from "../1-models/device-model";
import logic from "../3-logic/device-logic";

const DeviceRouter = Router();

DeviceRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const types = await logic.getAllDevices();
      response.status(200).json(types);
    } catch (err) {
      next(err);
    }
  }
);

DeviceRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const type = await logic.getDevice(id);
      response.status(200).json(type);
    } catch (err) {
      next(err);
    }
  }
);

DeviceRouter.post(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedType = await logic.addDevice(request.body);
      response.status(201).json(addedType);
    } catch (err) {
      next(err);
    }
  }
);

DeviceRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await logic.deleteDevice(id);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

DeviceRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      const type = new DeviceModel(request.body);
      const newDevice = await logic.updateFullDevice(type);
      response.status(200).json(newDevice);
    } catch (err) {
      next(err);
    }
  }
);

export default DeviceRouter;
