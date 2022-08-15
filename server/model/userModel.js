import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  secondname: {
    type: String,
    required: true,
    unique: true,
  },
  emailaddress: {
    type: String,
    required: true,
    unique: true,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
