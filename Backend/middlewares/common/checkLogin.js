const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const personalInfoSchem = require("../../model/Users/personalInfoSchem");
const { GOOGLE, FB } = require("../../constants/defaultConstant");

const PersonalInfo = new mongoose.model("PersonalInfo", personalInfoSchem);

const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  console.log(cookies[process.env.COOKIE_NAME]);
  if (cookies[process.env.COOKIE_NAME]) {
    try {
      token = cookies[process.env.COOKIE_NAME];
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (res.locals.html) {
        res.locals.loggedInUser = decoded;
      }
      res.status(200).json({
        message: "Loggedin",
        userInfo: decoded,
        token: token,
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: "Authentication failure!",
          },
        },
      });
    }
  } else {
    res.status(200).json({
      errors: {
        common: {
          msg: "You are not logged in. please go to homepage",
        },
      },
    });
  }
};

const isLoggedin = async (req, res, next) => {
  if (req.body.mode === GOOGLE) {
    const personalInfo = new PersonalInfo();
    const { id, mode, token } = req.body;

    try {
      console.log(id, mode);
      const resultPerson = await personalInfo.findUserById(id, mode);
      console.log(resultPerson);
      if (resultPerson) {
        const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
        axios
          .get(url)
          .then((response) => {
            next();
          })
          .catch((error) => {
            async function updateToken() {
              try {
                const resultPerson = await personalInfo.findUserById(id, mode);
                if (resultPerson) {
                  const url = "https://www.googleapis.com/oauth2/v4/token";
                  const requestBody = new URLSearchParams();
                  requestBody.append("client_id", process.env.AUTH_CLIENT_ID);
                  requestBody.append(
                    "client_secret",
                    process.env.AUTH_CLIENT_SECRET
                  );
                  requestBody.append(
                    "refresh_token",
                    resultPerson.refresh_token
                  );
                  requestBody.append("grant_type", "refresh_token");

                  axios
                    .post(url, requestBody.toString(), {
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                    })
                    .then((response) => {
                      const tokenData = response.data;
                      tokenData.refresh_token = resultPerson.refresh_token;
                      next();
                    })
                    .catch((error) => {
                      res.status(500).json({
                        error,
                      });
                    });
                } else {
                  res.status(200).json({
                    message: error,
                  });
                }
              } catch (err) {
                res.status(500).json({
                  errors: {
                    common: {
                      msg: err,
                    },
                  },
                });
              }
            }
            updateToken();
          });
      } else {
        res.status(200).json({
          message: "Not valid user",
        });
      }
    } catch (error) {
      res.status(200).json({
        error,
      });
    }
  } else if (req.body.mode === FB) {
    const { token } = req.body;
    const url = `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_CLIENT_ID}&client_secret=${process.env.FB_CLIENT_SECRET}&fb_exchange_token=${token}`;
    axios
      .get(url)
      .then((response) => {
        next();
      })
      .catch((error) => {
        res.status(500).json({
          message: "Failed",
          error,
        });
      });
  } else {
    let cookies =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
      try {
        token = cookies[process.env.COOKIE_NAME];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        //pass user info to response locals
        if (res.locals.html) {
          res.locals.loggedInUser = decoded;
        }
        next();
      } catch (err) {
        res.status(500).json({
          errors: {
            common: {
              msg: "Authentication failure!",
            },
          },
        });
      }
    } else {
      res.status(200).json({
        errors: {
          common: {
            msg: "You are not logged in. please go to homepage",
          },
        },
      });
    }
  }
};

function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      if (res.locals.html) {
        next(
          createHttpError(401, "You are not authorized to access this page!")
        );
      } else {
        res.status(401).json({
          errors: {
            common: {
              msg: "You are not authorized!",
            },
          },
        });
      }
    }
  };
}

const redirectLoggedIn = function (req, res, next) {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (!cookies[process.env.COOKIE_NAME]) {
    next();
  } else {
    token = cookies[process.env.COOKIE_NAME];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      message: "You are already logged in",
      userInfo: decoded,
      token: token,
    });
  }
};

module.exports = {
  checkLogin,
  redirectLoggedIn,
  requireRole,
  isLoggedin,
};
