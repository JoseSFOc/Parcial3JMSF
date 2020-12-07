const User = require("../models/user");
const AllFacade = require("../dao/allFacade");

exports.findAll = async function (req, res, next) {
  try {
    res.status(200).json(await AllFacade.find(User));
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    res.status(200).json(await AllFacade.findById(User, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await AllFacade.create(User, req.body));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).json(await AllFacade.delete(User, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    res.status(200).json(await AllFacade.put(User, req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};
