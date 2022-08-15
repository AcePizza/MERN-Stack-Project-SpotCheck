import express from "express";
import User from "../../model/userModel.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      allUsers,
      number: allUsers.length,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Server Failed",
    });
  }
};

export { getAllUsers };
