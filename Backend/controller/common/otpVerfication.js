const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userVerficationSchem = require("../../model/Users/userVerficationSchem");
const { transporter } = require("./mailProtocol");
const UserVerification = new mongoose.model(
  "UserVerification",
  userVerficationSchem
);

async function signUpOtpVerficationEmail({ _id, email, name }, res) {
  try {
    console.log(_id, email, name);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    let mailBody = `
        <div>
          <p>Dear Valued User,</p>
        </div>
        <div>
            <p>As-salamu alaykum (ٱلسَّلَامُ عَلَيْكُمْ). Greetings from MuslimBud.</p>
            <p>
               Please do not share your One Time Password (OTP) with anyone. Use <b>${otp}</b> for completing the sign-up process. This OTP is valid for the next 5 minutes. 
            </p>
            <p>
              If the request is not performed by you, please immediately contact us at mindlinkdeev@gmail.com.
            </p>
            <p>
              Thank you for downloading MuslimBud. If you find time, kindly leave a review on the Play Store. You Inspire Us. جَزَاكَ ٱللَّٰهُ خَيْرًا.
            </p>
        </div>
        <div>
            <p>Sincerely,</p>
            <p>MindLink</p>
        </div>
    `;

    let mailOptions = {
      from: `${process.env.AUTH_GMAIL}`,
      to: email,
      subject: `OTP for MuslimBud Registration`,
      html: mailBody,
    };

    const saltround = 10;
    const hashedotp = await bcrypt.hash(otp, saltround);

    const addOtp = await new UserVerification({
      user_id: _id,
      otp: hashedotp,
      expiresAt: Date.now() + 300000,
    });

    await addOtp.save();
    // send email
    await transporter
      .sendMail(mailOptions)
      .then((success) => {
        res.json({
          status: "PENDING",
          message: "Verification OTP has sent",
          data: {
            user_id: _id,
            name: name,
            email: email,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          errors: {
            common: {
              msg: err,
            },
          },
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: {
        common: {
          msg: error,
        },
      },
    });
  }
}

module.exports = {
  signUpOtpVerficationEmail,
};
