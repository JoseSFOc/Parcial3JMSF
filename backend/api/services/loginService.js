const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.getClientId = async function (req, res, next) {
  try {
    res.status(200).json({ clientId: process.env.GOOGLE_CLIENT_ID });
  } catch (err) {
    next(err);
  }
};

exports.login = (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    client
      .verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      .then((response) => {
        const { email_verified, name, email } = response.payload;

        if (email_verified) {
          User.findOne({ email }).exec((err, user) => {
            if (err) {
              return res.status(500).json({ error: "Something went wrong" });
            } else {
              if (user) {
                const token = jwt.sign(
                  { _id: user._id },
                  process.env.JWT_SIGNING_KEY,
                  { expiresIn: "7d" }
                );
                res.header("Access-Control-Allow-Origin", "*");
                res.status(200).json({
                  token,
                  user,
                });
              } else {
                const newUser = new User({ name, email });
                newUser.save((err, data) => {
                  if (err) {
                    return res
                      .status(500)
                      .json({ error: "Something went wrong" });
                  } else {
                    const token = jwt.sign(
                      { _id: newUser._id },
                      process.env.JWT_SIGNING_KEY,
                      { expiresIn: "7d" }
                    );
                    res.header("Access-Control-Allow-Origin", "*");
                    res.status(200).json({
                      token,
                      newUser,
                    });
                  }
                });
              }
            }
          });
        } else {
          res.header("Access-Control-Allow-Origin", "*");
          return res.status(403).json({ error: "Forbidden" });
        }
      });
  } catch (err) {
    next(err);
  }
};
