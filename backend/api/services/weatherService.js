const weatherFacade = require("../dao/weatherFacade");

exports.findByCoordinates = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        await weatherFacade.findByCoordinates(req.query.lat, req.query.lon)
      );
  } catch (e) {
    next(e);
  }
};
