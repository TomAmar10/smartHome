import { Router, Request, Response, NextFunction } from "express";
import UserModel from "../1-models/user-model";
import logic from "../3-logic/user-logic";

const UserRouter = Router();

UserRouter.get(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await logic.getAllUsers();
      response.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.get(
  "/id/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      const user = await logic.getUserById(id);
      response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);
UserRouter.get(
  "/username/:username",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const username = request.params.username;
      const user = await logic.getUserByUsername(username);
      response.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.post(
  "/all",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const addedUser = await logic.addUser(request.body);
      response.status(201).json(addedUser);
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.delete(
  "/id/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = +request.params.id;
      await logic.deleteUser(id);
      response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

UserRouter.put(
  "/id/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.id = +request.params.id;
      const user = new UserModel(request.body);
      const newUser = await logic.updateFullUser(user);
      response.status(200).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

export default UserRouter;
