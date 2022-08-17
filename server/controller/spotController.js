import SpotModal from "../model/spotModal.js";

const getAllSpots = async (req, res) => {
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

export { getAllSpots, getBoroughs };
