import express from "express";
import User from "../model/userModel.js";
import { getAllUsers } from "../controller/controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});

router.get("/all", getAllUsers); // imported from controller

export default router;
