import express from "express";
import {
  getAllUsers,
  signInUser,
  signUp,
  updateUser,
  uploadProfilePicture,
} from "../controller/usersController.js";
import { multerUpload } from "../middelwares/multer.js";

const userRouter = express.Router();

userRouter.get("/all", getAllUsers); // imported from controller
userRouter.post("/signup", signUp);
userRouter.post("/login", signInUser);
userRouter.post("/update", updateUser);
userRouter.post(
  "/imageupload",
  multerUpload.single("image"),
  uploadProfilePicture
);

export default userRouter;
