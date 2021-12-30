import { Router } from "express";
import { attachControllers } from "@decorators/express";
import { PubController } from "controller/PubController";
import { UserController } from "controller/UserController";

// Export the base-router
const baseRouter = Router();
attachControllers(baseRouter, [PubController, UserController]);
export default baseRouter;
