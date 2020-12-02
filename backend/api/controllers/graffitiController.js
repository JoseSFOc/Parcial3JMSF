const mongoose = require("mongoose");
const graffitiService = require("../services/graffitiService");

exports.findAll = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy;
    const query = new mongoose.Query();
    let conditions = {};

    for (let key in req.query) {
      req.query[key] !== orderBy &&
      req.query[key] !== sortBy &&
      req.query[key] !== ""
        ? (conditions[key] = req.query[key])
        : null;
    }

    query.setQuery(conditions);
    if (sortBy) query.setOptions({ sort: { [sortBy]: orderBy } });

    res.status(200).json(await graffitiService.findQuery(query));
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    res.status(200).json(await graffitiService.findById(req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    res.status(201).json(await graffitiService.create(req.body));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).json(await graffitiService.delete(req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    res.status(200).json(await graffitiService.put(req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

exports.addPositiveVote = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await graffitiService.addPositiveVote(req.params.id, req.body._id));
  } catch (err) {
    next(err);
  }
};

exports.addNegativeVote = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await graffitiService.addNegativeVote(req.params.id, req.body._id));
  } catch (err) {
    next(err);
  }
};

exports.removePositiveVote = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        await graffitiService.removePositiveVote(req.params.id, req.body._id)
      );
  } catch (err) {
    next(err);
  }
};

exports.removeNegativeVote = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        await graffitiService.removeNegativeVote(req.params.id, req.body._id)
      );
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(await graffitiService.addComment(req.params.id, req.body._id));
  } catch (err) {
    next(err);
  }
};
