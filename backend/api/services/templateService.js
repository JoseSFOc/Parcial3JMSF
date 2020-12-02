const Template = require("../models/template");
const allFacade = require("../dao/allFacade");
const templateFacade = require("../dao/graffitiFacade");

exports.findAll = async () => {
  return await allFacade.find(Template);
};

exports.findById = async (id) => {
  return await allFacade.findById(Template, id);
};

exports.findQuery = async (query) => {
  return await allFacade.findQuery(Template, query);
};

exports.create = async (object) => {
  return await allFacade.create(Template, object);
};

exports.delete = async (id) => {
  return await allFacade.delete(Template, id);
};

exports.put = async (id, object) => {
  return await allFacade.put(Template, id, object);
};
