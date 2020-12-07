const mongoose = require("mongoose");
const Graffiti = require("../models/graffiti");
const AllFacade = require("../dao/allFacade");
const GraffitiFacade = require("../dao/graffitiFacade");

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

    res.status(200).json(await AllFacade.findQuery(Graffiti, query));
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    res.status(200).json(await AllFacade.findById(Graffiti, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    res.status(201).json(await AllFacade.create(Graffiti, req.body));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).json(await AllFacade.delete(Graffiti, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(await AllFacade.put(Graffiti, req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};

exports.addPositiveVote = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(
        await GraffitiFacade.addPositiveVote(
          Graffiti,
          req.params.id,
          req.body._id
        )
      );
  } catch (err) {
    next(err);
  }
};

exports.addNegativeVote = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(
        await GraffitiFacade.addNegativeVote(
          Graffiti,
          req.params.id,
          req.body._id
        )
      );
  } catch (err) {
    next(err);
  }
};

exports.removePositiveVote = async (req, res, next) => {
  try {
    res
      .status(200)
      .json(
        await GraffitiFacade.removePositiveVote(
          Graffiti,
          req.params.id,
          req.body._id
        )
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
        await GraffitiFacade.removeNegativeVote(
          Graffiti,
          req.params.id,
          req.body._id
        )
      );
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    res
      .status(201)
      .json(
        await GraffitiFacade.addComment(Graffiti, req.params.id, req.body._id)
      );
  } catch (err) {
    next(err);
  }
};
