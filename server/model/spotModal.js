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
  votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      timestamps: true,
      message: String,
      reply: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          timestamps: true,
          comment: String,
        },
      ],
    },
  ],
});

const SpotModal = mongoose.model("spot", spotSchema);

export default SpotModal;
