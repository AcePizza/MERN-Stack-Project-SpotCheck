import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { application } from "express";

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

const encryptPassword = async (password) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    return hashPassword;
  } catch (error) {
    console.log("Error hashing password");
  }
};

export { getAllUsers, signUp };
