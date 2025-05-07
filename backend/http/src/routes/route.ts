import {Router} from "express";
import { UserService } from "./user";
import { AuthService } from "./auth";
export const routes = Router();
routes.use("/user",UserService);
routes.use("/auth",AuthService);