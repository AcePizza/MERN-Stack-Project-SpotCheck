import express from "express";
import {
  getAllSpots,
  getBoroughs,
  createSpot,
} from "../controller/spotController.js";

const spotRouter = express.Router();

spotRouter.get("/all", getAllSpots);
spotRouter.get("/:boroughsBerlin", getBoroughs);
spotRouter.post("/createspot", createSpot);

export default spotRouter;
