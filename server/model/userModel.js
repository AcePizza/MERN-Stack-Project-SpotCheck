import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  emailaddress: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
