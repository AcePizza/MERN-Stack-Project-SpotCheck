import express from "express";
import { getAllSpots } from "../controller/spotController.js";

const spotRouter = express.Router();

spotRouter.get("/all", getAllSpots);

export default spotRouter;
