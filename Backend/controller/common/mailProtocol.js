const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sadatfaruque005@gmail.com", //process.env.CUSTOM_GMAIL,
    pass: "iqnfjpnwawggajlp", //process.env.CUSTOM_PASSWORD,
  },
});

module.exports = {
  transporter,
};
