import express from "express";
import { getAllUsers, signUp } from "../controller/usersController.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers); // imported from controller
userRouter.post("/signup", signUp);

export default userRouter;
