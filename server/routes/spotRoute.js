import express from "express";
import { getAllSpots, getBoroughs } from "../controller/spotController.js";

const spotRouter = express.Router();

spotRouter.get("/all", getAllSpots);
spotRouter.get("/:boroughsBerlin", getBoroughs);

export default spotRouter;
