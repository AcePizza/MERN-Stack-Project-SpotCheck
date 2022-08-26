import express from "express";
import {
  findOneUser,
  getAllUsers,
  searchUser,
  signInUser,
  signUp,
  updateUser,
  uploadProfilePicture,
} from "../controller/usersController.js";
import { multerUpload } from "../middelwares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers); // imported from controller
userRouter.get("/findoneuser", jwtAuth, findOneUser);
userRouter.get("/search/:searchUser", searchUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", signInUser);
userRouter.post("/update", updateUser);
userRouter.post(
  "/imageupload",
  multerUpload.single("image"),
  uploadProfilePicture
);

export default userRouter;
