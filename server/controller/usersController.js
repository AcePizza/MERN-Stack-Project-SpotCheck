import UserModel from "../model/userModel.js";

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

export { getAllUsers };
