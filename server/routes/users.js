import express from "express";
import User from "../model/testModel.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Test route." });
});

router.get("/all", (req, res) => {
  User.find({}, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

export default router;
