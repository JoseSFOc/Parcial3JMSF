exports.templateFunction = async () => {
  return;
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
