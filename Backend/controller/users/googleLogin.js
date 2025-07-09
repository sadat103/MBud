const axios = require("axios");
const personalInfoSchem = require("../../model/Users/personalInfoSchem");
const mongoose = require("mongoose");
const { GOOGLE } = require("../../constants/defaultConstant");
const personPrefSchema = require("../../model/Users/personPrefSchema");
const conversationSchema = require("../../model/conversations/conversationSchema");

const PersonalPref = new mongoose.model("PersonalPref", personPrefSchema);
const PersonalInfo = new mongoose.model("PersonalInfo", personalInfoSchem);
const Conversations = new mongoose.model("Conversations", conversationSchema);

async function googleTokenValidate(req, res) {
  const { user_id, mode, token } = req.body;
  console.log(user_id, mode, token);
  try {
    const personalInfo = new PersonalInfo();
    const resultPerson = await personalInfo.findUserById(user_id, mode);
    if (resultPerson) {
      const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`;
      axios
        .get(url)
        .then((response) => {
          const tokenData = response.data;
          res.status(200).json({
            data: {
              message: "Token is valid",
              tokenData,
            },
          });
        })
        .catch((error) => {
          async function updateToken() {
            try {
              const personalInfo = new PersonalInfo();
              const resultPerson = await personalInfo.findUserById(
                user_id,
                mode
              );
              console.log(resultPerson);
              if (resultPerson) {
                const url = "https://www.googleapis.com/oauth2/v4/token";
                const requestBody = new URLSearchParams();
                requestBody.append("client_id", process.env.AUTH_CLIENT_ID);
                requestBody.append(
                  "client_secret",
                  process.env.AUTH_CLIENT_SECRET
                );
                requestBody.append("refresh_token", resultPerson.refresh_token);
                requestBody.append("grant_type", "refresh_token");
                console.log(requestBody);
                axios
                  .post(url, requestBody.toString(), {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                  })
                  .then((response) => {
                    const tokenData = response.data;
                    console.log(tokenData);
                    tokenData.refresh_token = resultPerson.refresh_token;
                    res.status(200).json({
                      data: {
                        message: "Token regenerated",
                        tokenData,
                      },
                    });
                  })
                  .catch((error) => {
                    res.status(500).json({
                      message: error,
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
    console.log("error token", error);
    res.status(200).json({
      error,
    });
  }
}

async function googleUserInfo(req, res) {
  const url = "https://www.googleapis.com/userinfo/v2/me";

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${req.body.token}`,
      },
    })
    .then((response) => {
      async function updateTable() {
        try {
          const personalInfo = new PersonalInfo();
          const resultPerson = await personalInfo.findUser(
            response.data.email,
            GOOGLE
          );
          if (resultPerson) {
            res.status(200).json({
              message: "User already exist",
              resultPerson,
            });
          } else {
            try {
              const adduser = new PersonalInfo({
                name: response.data.name,
                email: response.data.email,
                password: "",
                mobile: "",
                image: response.data.picture,
                refresh_token: req.body.refresh_token,
                is_verified: response.data.verified_email,
                user_mode: GOOGLE,
                theme: "DEFAULT",
                upgraded: false,
              });
              const resultPerson = await adduser.save();

              if (resultPerson) {
                const addPref = new PersonalPref({
                  user_id: resultPerson.id,
                  feature_request: false,
                });
                const resultPref = await addPref.save();

                const newConvr = new Conversations({
                  name: "unknown",
                  user: {
                    id: resultPerson.id,
                    name: resultPerson.name,
                  },
                  limit_reached: "no",
                });

                const resultConv = await newConvr.save();
                console.log(resultConv, resultPref, resultConv);
                res.status(200).json({
                  message: "User was added successfully!",
                  resultPerson,
                  resultPref,
                  resultConv,
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
        } catch (err) {
          console.log(err);
          res.status(500).json({
            errors: {
              common: {
                msg: err,
              },
            },
          });
        }
      }
      updateTable();
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
}

async function googleLogOut(req, res) {
  try {
    const response = await axios.post(
      "https://accounts.google.com/o/oauth2/revoke",
      null,
      {
        params: {
          token: req.body.token,
        },
      }
    );

    console.log(response);

    if (response.status === 200) {
      res.status(200).json({
        message: "Success",
      });
    } else {
      res.status(500).json({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Success",
    });
  }
}

module.exports = {
  googleUserInfo,
  googleLogOut,
  googleTokenValidate,
};
