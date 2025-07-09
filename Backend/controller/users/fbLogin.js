const axios = require("axios");
const fetch = require("node-fetch");
const personalInfoSchem = require("../../model/Users/personalInfoSchem");
const mongoose = require("mongoose");
const { FB } = require("../../constants/defaultConstant");
const personPrefSchema = require("../../model/Users/personPrefSchema");
const conversationSchema = require("../../model/conversations/conversationSchema");

const PersonalPref = new mongoose.model("PersonalPref", personPrefSchema);
const PersonalInfo = new mongoose.model("PersonalInfo", personalInfoSchem);
const Conversations = new mongoose.model("Conversations", conversationSchema);

async function fbUserInfo(req, res) {
  const personalInfo = new PersonalInfo();
  const { token } = req.body;
  const url = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      async function updateTable() {
        try {
          const resultPerson = await personalInfo.findUser(resp.data.email, FB);
          if (resultPerson) {
            res.status(200).json({
              message: "User already exist",
              resultPerson,
              token: token,
            });
          } else {
            try {
              const adduser = new PersonalInfo({
                name: resp.data.name,
                email: resp.data.email,
                password: "",
                mobile: "",
                image: resp.data.picture.data.url,
                refresh_token: "",
                is_verified: true,
                user_mode: FB,
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
                    avatar: null,
                  },
                  limit_reached: "no",
                });

                const resultConv = await newConvr.save();
                res.status(200).json({
                  message: "User was added successfully!",
                  token: response.data.access_token,
                  resultPerson,
                  resultPref,
                  resultConv,
                });
              }
            } catch (err) {
              res.status(500).json({
                message: "Failed",
                err,
              });
            }
          }
        } catch (error) {
          res.status(500).json({
            message: "Failed",
            error,
          });
        }
      }
      updateTable();
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed",
        error,
      });
    });
}

async function fbTokenValidate(req, res) {
  const { token } = req.body;
  const personalInfo = new PersonalInfo();
  const url = `https://graph.facebook.com/v12.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FB_CLIENT_ID}&client_secret=${process.env.FB_CLIENT_SECRET}&fb_exchange_token=${token}`;
  axios
    .get(url)
    .then((response) => {
      const urlInfo = `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`;
      //console.log(response);
      axios
        .get(urlInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          async function updateTable() {
            try {
              const resultPerson = await personalInfo.findUser(
                resp.data.email,
                FB
              );
              if (resultPerson) {
                res.status(200).json({
                  message: "User already exist",
                  resultPerson,
                  token: response.data.access_token,
                });
              } else {
                try {
                  const adduser = new PersonalInfo({
                    name: resp.data.name,
                    email: resp.data.email,
                    password: "",
                    mobile: "",
                    image: resp.data.picture.data.url,
                    refresh_token: "",
                    is_verified: true,
                    user_mode: FB,
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
                        avatar: null,
                      },
                      limit_reached: "no",
                    });

                    const resultConv = await newConvr.save();
                    res.status(200).json({
                      message: "User was added successfully!",
                      token: response.data.access_token,
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
            } catch (error) {
              res.status(500).json({
                message: "Failed",
                error,
              });
            }
          }
          updateTable();
        })
        .catch((error) => {
          res.status(500).json({
            message: "Failed",
            error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed",
        error,
      });
    });
}

async function fbLogOut(req, res) {
  const { token } = req.body;
  //console.log(token);
  try {
    const deleteResponse = await fetch(
      `https://graph.facebook.com/v12.0/me/permissions?access_token=${token}`,
      {
        method: "DELETE",
      }
    );
    //console.log(deleteResponse);
    const deleteUser = await deleteResponse.json();
    if (deleteUser.success) {
      res.status(200).json({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed",
      error,
    });
  }
}

module.exports = {
  fbUserInfo,
  fbLogOut,
  fbTokenValidate,
};
