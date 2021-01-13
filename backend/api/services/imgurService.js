const imgurFacade = require("../dao/imgurFacade");

exports.upload = async (req, res, next) => {
  try {
    res.status(201).json(await imgurFacade.upload(req.body));
  } catch (e) {
    next(e);
  }
};
