import { Router, Request, Response, NextFunction } from "express";
import ScenarioModel from "../1-models/scenario-model";
import logic from "../3-logic/scenario-logic";

const ScenarioRouter = Router();

ScenarioRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const types = await logic.getAllScenarios();
      response.status(200).json(types);
    } catch (err) {
      next(err);
    }
  }
);

ScenarioRouter.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const type = await logic.getScenario(id);
      response.status(200).json(type);
    } catch (err) {
      next(err);
    }
  }
);

ScenarioRouter.post(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedScenario = await logic.addScenario(request.body);
      response.status(201).json(addedScenario);
    } catch (err) {
      next(err);
    }
  }
);

ScenarioRouter.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await logic.deleteScenario(id);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

ScenarioRouter.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      const type = new ScenarioModel(request.body);
      const newType = await logic.updateFullScenario(type);
      response.status(200).json(newType);
    } catch (err) {
      next(err);
    }
  }
);

export default ScenarioRouter;
