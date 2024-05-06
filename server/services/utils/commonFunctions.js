const nodemailer = require("nodemailer");
const twilio = require("twilio");
const config = require("../../constants/config");
const Modal = require("../../mongoDB/modals/index");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
});

const twilioClient = twilio(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function saveOtp(verificationMode, otpCode, phoneNumber, email) {
  try {
    console.log("========>>>> mode", verificationMode, otpCode);
    let existingOtpDocument;
    if (verificationMode === "email") {
      existingOtpDocument = await Modal.OtpModal.findOneAndDelete({ email });
    } else if (verificationMode === "phone") {
      existingOtpDocument = await Modal.OtpModal.findOneAndDelete({ phoneNumber });
    }
    
    let otpDocument = new Modal.OtpModal({
      verificationMode,
      otpCode,
      phoneNumber,
      email,
    });
    await otpDocument.save();
    return true;
  } catch (error) {
    console.error("Error saving OTP:", error);
    return false;
  }
}

async function sendEmailOTP(email, otpCode) {
  const mailOptions = {
    from: "mickeysandhu7@gmail.com",
    to: email,
    subject: "Your OTP for Verification",
    text: `Your OTP is: ${otpCode}`,
  };
  const success = await transporter.sendMail(mailOptions);
  console.log(success)
}

async function sendSMSOTP(phoneNumber, otpCode) {
  await twilioClient.messages.create({
    body: `Your OTP is: ${otpCode}`,
    from: "+12546383284",
    to: `+91${phoneNumber}`,
  });
}
module.exports = {
  sendSMSOTP: sendSMSOTP,
  sendEmailOTP: sendEmailOTP,
  saveOtp: saveOtp,
  generateOTP: generateOTP,
};
