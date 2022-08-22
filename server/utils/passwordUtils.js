import bcrypt from "bcrypt";

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

const verifyPassword = async (req, exsistingUser) => {
  try {
    const isPasswordVerified = await bcrypt.compare(
      req.body.password,
      exsistingUser.password
    );
    return isPasswordVerified;
  } catch (error) {
    res.status(409).json({
      msg: "There was an error comparing password",
      error: error,
    });
  }
};

export { encryptPassword, verifyPassword };
