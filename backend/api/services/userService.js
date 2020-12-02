const User = require("../models/user");
const AllFacade = require("../dao/allFacade");

exports.findAll = async () => {
  return await AllFacade.find(User);
};

exports.findById = async (id) => {
  return await AllFacade.findById(User, id);
};

exports.create = async (object) => {
  return await AllFacade.create(User, object);
};

exports.delete = async (id) => {
  return await AllFacade.delete(User, id);
};

exports.put = async (id, object) => {
  return await AllFacade.put(User, id, object);
};
