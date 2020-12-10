exports.find = async (model) => {
  return model
    .find()
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
};

exports.findById = async (model, id) => {
  const doc = await model
    .findById(id)
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
  if (doc) {
    return doc;
  } else {
    const error = new Error("id=" + id + " not found");
    error.status = 404;
    throw error;
  }
};

exports.findQuery = async (model, query) => {
  const doc = await model
    .find(query)
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
  if (doc) {
    return doc;
  } else {
    const error = new Error("id=" + id + " not found");
    error.status = 404;
    throw error;
  }
};

exports.create = async (model, object) => {
  const m = new model(object);
  return m.save().catch((err) => {
    errorHandler(err);
  });
};

exports.delete = async (model, id) => {
  return model
    .deleteOne({ _id: id })
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
};

exports.deleteAll = async (model) => {
  return model
    .deleteMany({})
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
};

exports.put = async (model, id, object) => {
  console.log(object);
  return model
    .updateOne({ _id: id }, { $set: object }, { runValidators: true })
    .exec()
    .catch((err) => {
      errorHandler(err);
    });
};

function errorHandler(err) {
  let error = new Error(err);
  switch (err.name) {
    case "ParallelSaveError":
      error.status = 400;
      error.message = "The document is already been saved.";
      break;
    case "OverwriteModelError":
      error.status = 403;
      error.message = "You can't redifine the models.";
      break;
    case "MissingSchemaError":
      error.status = 404;
      error.message = "Model not found.";
      break;
    case "DocumentNotFoundError":
      error.status = 404;
      error.message = "The document you tried to save was not found.";
      break;
    case "ObjectParameterError" || "ObjectExpectedError":
      error.status = 406;
      error.message = "Resquest format not available.";
      break;
    case "DisconnectedError":
      error.status = 500;
      error.message = "The server was disconnected.";
      break;
    case "ValidationError":
      error.status = 422;
      break;
    case "CastError":
      error.status = 400;
      break;
    case "MongooseError":
      error.status = 400;
      error.message = "Error with the database.";
      break;
    default:
      error.status = 500;
      error.message = "Something went wrong in the server, sorry.";
  }
  throw error;
}

exports.errorHandler = errorHandler;
