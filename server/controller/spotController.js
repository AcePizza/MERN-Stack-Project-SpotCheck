import SpotModal from "../model/spotModal.js";

const getAllSpots = async (req, res) => {
  try {
    const allSpots = await SpotModal.find({});
    if (allSpots.length === 0) {
      res.status(200).json({
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

export { getAllSpots };
