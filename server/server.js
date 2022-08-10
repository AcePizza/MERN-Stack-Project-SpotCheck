import express from "express";
import cors from "cors";
import router from "./routes/users.js";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connection to Mongo DB established"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("Server is running on " + port + "port");
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use("/users", router);
