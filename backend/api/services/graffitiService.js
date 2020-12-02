const Graffiti = require("../models/graffiti");
const AllFacade = require("../dao/allFacade");
const GraffitiFacade = require("../dao/graffitiFacade");

exports.findAll = async () => {
  return await AllFacade.find(Graffiti);
};

exports.findById = async (id) => {
  return await AllFacade.findById(Graffiti, id);
};

exports.findQuery = async (query) => {
  return await AllFacade.findQuery(Graffiti, query);
};

exports.create = async (object) => {
  return await AllFacade.create(Graffiti, object);
};

exports.delete = async (id) => {
  return await AllFacade.delete(Graffiti, id);
};

exports.put = async (id, object) => {
  return await AllFacade.put(Graffiti, id, object);
};

exports.addPositiveVote = async (id, userId) => {
  return await GraffitiFacade.addPositiveVote(Graffiti, id, userId);
};

exports.addNegativeVote = async (id, userId) => {
  return await GraffitiFacade.addNegativeVote(Graffiti, id, userId);
};

exports.removePositiveVote = async (id, userId) => {
  return await GraffitiFacade.removePositiveVote(Graffiti, id, userId);
};

exports.removeNegativeVote = async (id, userId) => {
  return await GraffitiFacade.removeNegativeVote(Graffiti, id, userId);
};

exports.addComment = async (id, commentId) => {
  return await GraffitiFacade.addComment(Graffiti, id, commentId);
};
