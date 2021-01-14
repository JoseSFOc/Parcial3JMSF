const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const mongodb =
  process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/examtemplate";
const morgan = require("morgan");
const mongoose = require("mongoose");
const formData = require("express-form-data");
const os = require("os");
const bodyParser = require("body-parser");

/* Middleware */
app.use(morgan("dev"));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));

// for parsing multipart/form-data
// parse data with connect-multiparty.
app.use(
  formData.parse({
    uploadDir: os.tmpdir(),
    autoClean: true,
  })
);
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* Database */
mongoose
  .connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("\x1b[32mSUCCESS\x1b[0m MongoDB connected"))
  .catch(() => console.error("\x1b[31mERROR\x1b[0m MongoDB is not connected"));

/* Routes */
const root = "./api/routes";
const templateRoutes = require(root + "/templates");
const locationsTemplateRoutes = require(root + "/locations");
const userRoutes = require(root + "/users");
const loginRoutes = require(root + "/logins");
const imgurRoutes = require(root + "/imgur");
const weahterRoutes = require(root + "/weather");

app.use("/templates", templateRoutes);
app.use("/locations", locationsTemplateRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/uploadImage", imgurRoutes);
app.use("/weather", weahterRoutes);

/*Error Route*/

app.use((req, res, next) => {
  const error = new Error(
    "Method " + req.method + " for " + req.originalUrl + " not found"
  );
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

/* Listen */
app.listen(port, () => {
  console.log("> Server Running at http://localhost:" + port);
});
