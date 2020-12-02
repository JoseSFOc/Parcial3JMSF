exports.addPositiveVote = async (model, id, userId) => {
  const doc = await model.findById(id);
  if (doc && userId) {
    if (doc.votes.positives.some((v) => v._id == userId)) {
      const error = new Error("The user has already voted positive");
      error.status = 409;
      throw error;
    }
    if (doc.votes.negatives.some((v) => v._id == userId)) {
      await this.removeNegativeVote(model, id, userId);
    }

    return model
      .updateOne({ _id: id }, { $push: { "votes.positives": { _id: userId } } })
      .exec()
      .catch((err) => {
        errorHandler(err);
      });
  } else {
    let error;
    if (!doc && !userId) {
      error = new Error("Not found and you need to provide a userId");
      error.status = 404;
    } else if (!userId) {
      error = new Error("Error. You need to provide a userId");
      error.status = 400;
    } else if (!doc) {
      const error = new Error("id=" + id + " not found");
      error.status = 404;
    }
    throw error;
  }
};

exports.addNegativeVote = async (model, id, userId) => {
  const doc = await model.findById(id);
  if (doc && userId) {
    if (doc.votes.negatives.some((v) => v._id == userId)) {
      const error = new Error("The user has already voted negative");
      error.status = 409;
      throw error;
    }
    if (doc.votes.positives.some((v) => v._id == userId)) {
      await this.removePositiveVote(model, id, userId);
    }
    return model
      .updateOne({ _id: id }, { $push: { "votes.negatives": { _id: userId } } })
      .exec()
      .catch((err) => {
        errorHandler(err);
      });
  } else {
    let error;
    if (!doc && !userId) {
      error = new Error("Not found and you need to provide a userId");
      error.status = 404;
    } else if (!userId) {
      error = new Error("Error. You need to provide a userId");
      error.status = 400;
    } else if (!doc) {
      const error = new Error("id=" + id + " not found");
      error.status = 404;
    }
    throw error;
  }
};

exports.removePositiveVote = async (model, id, userId) => {
  let doc = await model.findById(id);
  if (!doc.votes.positives.some((v) => v._id == userId)) {
    const error = new Error("The user has not voted positive");
    error.status = 409;
    throw error;
  }

  doc = model
    .updateOne({ _id: id }, { $pull: { "votes.positives": { _id: userId } } })
    .exec()
    .catch((err) => {
      errorHandler(err);
    });

  return doc;
};

exports.removeNegativeVote = async (model, id, userId) => {
  let doc = await model.findById(id);
  if (!doc.votes.negatives.some((v) => v._id == userId)) {
    const error = new Error("The user has not voted negative");
    error.status = 409;
    throw error;
  }

  doc = model
    .updateOne({ _id: id }, { $pull: { "votes.negatives": { _id: userId } } })
    .exec()
    .catch((err) => {
      errorHandler(err);
    });

  return doc;
};

exports.addComment = async (model, id, commentId) => {
  let doc = await model.findById(id);
  if (doc.comments.some((v) => v._id === commentId)) {
    const error = new Error("The graffiti has already that comment");
    error.status = 409;
    throw error;
  } else {
    doc = model
      .updateOne({ _id: id }, { $push: { comments: { _id: commentId } } })
      .exec()
      .catch((err) => {
        errorHandler(err);
      });
    return doc;
  }
};

function errorHandler(err) {
  let error = new Error(err);
  switch (err.name) {
    case "ValidationError":
      error.status = 422;
      break;
    case "CastError":
      error.status = 404;
      break;
    default:
      error.status = 500;
  }
  throw error;
}
