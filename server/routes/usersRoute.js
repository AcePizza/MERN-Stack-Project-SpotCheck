import express from "express";
import {
  getAllUsers,
  signInUser,
  signUp,
} from "../controller/usersController.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers); // imported from controller
userRouter.post("/signup", signUp);
userRouter.post("/login", signInUser);

export default userRouter;
