import express, { Router } from "express";
import {
  getAllSpots,
  getBoroughs,
  createSpot,
  uploadSpotPicture,
  getOneSpot,
} from "../controller/spotController.js";
import { multerUpload } from "../middelwares/multer.js";

const spotRouter = express.Router();

spotRouter.get("/all", getAllSpots);
spotRouter.get("/one/:spot", getOneSpot);
spotRouter.get("/search/:boroughsBerlin", getBoroughs);
spotRouter.post("/createspot", createSpot);
spotRouter.post(
  "/imageupload",
  multerUpload.single("image"),
  uploadSpotPicture
);

export default spotRouter;
