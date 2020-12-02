const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const mongodb =
    process.env.MONGO_ATLAS_URI || "mongodb://localhost:27017/ingweb";
const morgan = require("morgan");
const mongoose = require("mongoose");

/* Middleware */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
//const messageRoutes = require(root + "/messages");
const graffitiRoutes = require(root + "/graffitis");
const userRoutes = require(root + "/users");
const commentRoutes = require(root + "/comments");
const conversationRoutes = require(root + "/conversations");
const routesRoutes = require(root + "/routes");
const wifiRoutes = require(root + "/wifi");
const airQualityRoutes = require(root + "/airQuality");

//app.use("/messages", messageRoutes);
app.use("/conversations", conversationRoutes);
app.use("/graffitis", graffitiRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/routes", routesRoutes);
app.use('/wifi', wifiRoutes);
app.use("/airQuality", airQualityRoutes);


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
    console.log(">Server Running at http://localhost:" + port);
});
