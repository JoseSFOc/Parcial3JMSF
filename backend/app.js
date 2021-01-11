const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const mongodb =
  process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/examtemplate";
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("body-parser-xml")(bodyParser);

/* Middleware  */
app.use(
  bodyParser.xml({
    xmlParseOptions: {
      normalize: true,
      normalizeTags: true,
      explicitArray: false,
      explicitRoot: false,
    },
  })
);
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
/*app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, content-type, accept, Authorization"
  );
  res.header(
    "Access-Control-Request-Headers",
    "X-Requested-With, accept, content-type"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});*/
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
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

app.use("/templates", templateRoutes);
app.use("/locations", locationsTemplateRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);

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
