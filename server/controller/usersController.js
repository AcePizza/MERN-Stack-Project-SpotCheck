import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import e, { application } from "express";
import { encryptPassword, verifyPassword } from "../utils/passwordUtils.js";
import { issueToken } from "../utils/jsonWebToken.js";

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({});
    if (allUsers.length === 0) {
      res.status(200).json({
        msg: "No users registered",
      });
    } else {
      res.status(200).json({
        allUsers,
        number: allUsers.length,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      msg: "Server Failed",
    });
    res.status(404).json({
      error: error,
      msg: "This is a test",
    });
  }
};

const signUp = async (req, res) => {
  console.log({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emailaddress: req.body.lastname,
    password: req.body.lastname,
    image: req.body.image,
  });

  try {
    const exsistingUser = await UserModel.findOne({
      emailaddress: req.body.emailaddress,
    });
    if (exsistingUser) {
      res.status(409).json({ msg: "User already exist" });
    } else {
      const hashedPassword = await encryptPassword(req.body.password);

      const newUser = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailaddress: req.body.emailaddress,
        password: hashedPassword,
        image: req.body.image,
      });

      try {
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            emailaddress: savedUser.emailaddress,
            password: savedUser.password,
            image: savedUser.image,
          },
          msg: "User created succesfully",
        });
      } catch (error) {
        res.status(409).json({
          msg: "There was an error creating the user",
          error: error,
        });
        console.log("error", error);
      }
    }
  } catch (error) {
    res.status(666).json({ msg: "Unfortunetly the world died" });
  }
};

const signInUser = async (req, res) => {
  console.log("request", req.body);

  try {
    const exsistingUser = await UserModel.findOne({
      emailaddress: req.body.emailaddress,
    });
    if (exsistingUser) {
      const verified = await verifyPassword(req, exsistingUser);
      if (verified) {
        const token = issueToken(exsistingUser._id);

        res.status(200).json({
          msg: "Success",
          user: {
            emailaddress: exsistingUser.emailaddress,
            user_id: exsistingUser._id,
          },
          token,
        });
      } else {
        res.status(401).json({ msg: "User could not be verified" });
      }
    } else {
      res.status(404).json({ msg: "Could not find user" });
    }
  } catch (error) {
    res.status(500).json({ msg: "An error was triggered while finding user" });
  }
};

export { getAllUsers, signUp, signInUser };
