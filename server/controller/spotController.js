import mongoose from "mongoose";
import SpotModal from "../model/spotModal.js";
import { v2 as cloudinary } from "cloudinary";

const getAllSpots = async (req, res) => {
  console.log("allSpots");
  try {
    const allSpots = await SpotModal.find({});
    if (allSpots.length === 0) {
      res.status(201).json({
        msg: "No users registered",
      });
    } else {
      res.status(200).json({
        allSpots,
        number: allSpots.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Server Failed",
    });
  }
};

const getBoroughs = async (req, res) => {
  console.log(req.params.boroughsBerlin);
  const { rating } = req.query;

  // Conditinal that checks is there is a rating in URL and if found uses it in the search
  if (rating) {
    try {
      const requestedBoroughs = await SpotModal.find({
        location: req.params.boroughsBerlin,
        rating: { $gte: rating },
      }).exec();

      if (requestedBoroughs.length === 0) {
        res.status(201).json({
          msg: "Nothing found",
        });
      } else {
        res.status(200).json({
          requestedBoroughs,
          number: requestedBoroughs.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
        msg: "Server Failed",
      });
    }
  } else {
    try {
      const requestedBoroughs = await SpotModal.find({
        location: req.params.boroughsBerlin,
      }).exec();

      if (requestedBoroughs.length === 0) {
        res.status(201).json({
          msg: "Nothing found",
        });
      } else {
        res.status(200).json({
          requestedBoroughs,
          number: requestedBoroughs.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
        msg: "Server Failed",
      });
    }
  }
};

const createSpot = async (req, res) => {
  console.log({
    title: req.body.title,
    location: req.body.location,
    image: req.body.image,
    description: req.body.description,
    votes: req.body.votes,
    author: req.body.author,
  });
  try {
    const existingSpot = await SpotModal.findOne({
      title: req.body.title,
    });
    if (existingSpot) {
      res.status(409).json({ msg: "Spot already exists" });
    } else {
      const newSpot = new SpotModal({
        title: req.body.title,
        location: req.body.location,
        image: req.body.image,
        description: req.body.description,
        votes: req.body.votes,
        author: req.body.author,
      });
      try {
        const saveSpot = await newSpot.save();
        res.status(200).json({ msg: "Spot created succesfully" });
      } catch (error) {
        res.status(409).json({ msg: "There was an error", error: error });
      }
    }
  } catch (error) {
    res.status(666).json({ msg: "Big problems" });
  }
};

const uploadSpotPicture = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "spotcheck-images",
    });
    res.status(200).json({
      msg: "Image uploaded succesfully",
      imageURL: uploadResult.url,
    });
  } catch (error) {
    res.status(500).json({
      msg: "There was an error when uploading the image",
      error: error.message,
      errorobject: error,
    });
  }
};

export { getAllSpots, getBoroughs, createSpot, uploadSpotPicture };
