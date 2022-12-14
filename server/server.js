import express from "express";
import cors from "cors";
import userRouter from "./routes/usersRoute.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import spotRouter from "./routes/spotRoute.js";
import cloudinaryConfig from "./config/cloudinaryConfig.js";
import limiter from "./utils/rateLimiter.js";
import passport from "passport";
import { passportConfig } from "./config/passport.js";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

const mongoDBConnection = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.warn(`Connection to Mongo DB on port: ${port} established`);
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
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
  });
};

const loadRoute = () => {
  // This is the URL from the browser
  app.use("/users", userRouter);
  app.use("/spots", spotRouter);
};

(function controller() {
  mongoDBConnection();
  addMiddleWare();
  loadRoute();
  startServer();
})();
