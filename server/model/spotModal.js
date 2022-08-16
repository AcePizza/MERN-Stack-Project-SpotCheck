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
    unique: true,
  },
  image: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  votes: Number,
  rating: Number,
});

const SpotModal = mongoose.model("spot", spotSchema);

export default SpotModal;
