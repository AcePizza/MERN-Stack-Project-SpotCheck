import express from "express";
import cors from "cors";
import router from "./routes/users.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

const mongoDBConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(`Connection to Mongo DB on port: ${port} established`);
  } catch (error) {
    console.log(error);
  }
};

const addMiddleWare = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
  });
};

const loadRoute = () => {
  app.use("/users", router);
};

(function controller() {
  mongoDBConnection();
  addMiddleWare();
  loadRoute();
  startServer();
})();
