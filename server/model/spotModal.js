import mongoose from "mongoose";

const spotSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  votes: Array,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const SpotModal = mongoose.model("spot", spotSchema);

export default SpotModal;
