import express from "express";
import { getAllUsers } from "../controller/usersController.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers); // imported from controller

export default userRouter;
