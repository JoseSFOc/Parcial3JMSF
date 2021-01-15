const Image = require("../models/image");
const allFacade = require("../dao/allFacade");
const mongoose = require("mongoose");
//const imageFacade = require("../dao/imageFacade");

/* Find with custom query */
exports.findAll = async (req, res, next) => {
  try {
    const sortBy = req.query.sortBy;
    const orderBy = req.query.orderBy;
    const partial = req.query.partial;
    const query = new mongoose.Query();
    let conditions = {};

    for (let key in req.query) {
      /*
      if (req.query[key] === email) {
        conditions["user.email"] = { $in: req.query[key] };
        console.log(conditions["user"] + " y " + req.query[key]);
      }  
      */
      if (
        req.query[key] !== orderBy &&
        req.query[key] !== sortBy &&
        req.query[key] !== partial &&
        req.query[key] !== ""
      ) {
        if (partial && partial == 1) {
          conditions[key] = { $regex: req.query[key], $options: "i" };
        } else {
          conditions[key] = req.query[key];
        }
      }
    }

    console.log(conditions);

    query.setQuery(conditions);
    if (sortBy) query.setOptions({ sort: { [sortBy]: orderBy } });

    res.status(200).json(await allFacade.findQuery(Image, query));
  } catch (err) {
    next(err);
  }
};

/*
exports.findAll = async function (req, res, next) {
  try {
    res.status(200).json(await allFacade.find(Image));
  } catch (err) {
    next(err);
  }
};
*/

exports.findById = async (req, res, next) => {
  try {
    res.status(200).json(await allFacade.findById(Image, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    res.status(201).json(await allFacade.create(Image, req.body));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    res.status(200).json(await allFacade.delete(Image, req.params.id));
  } catch (err) {
    next(err);
  }
};

exports.put = async (req, res, next) => {
  try {
    res.status(200).json(await allFacade.put(Image, req.params.id, req.body));
  } catch (err) {
    next(err);
  }
};
