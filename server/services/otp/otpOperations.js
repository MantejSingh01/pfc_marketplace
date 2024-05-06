const express = require("express");
const router = express.Router();
const Modal = require("../../mongoDB/modals/index");
const {
  saveOtp,
  sendEmailOTP,
  sendSMSOTP,
  generateOTP,
} = require("../utils/commonFunctions");

router.post("/sendOTP", async (req, res) => {
  const { email, phoneNumber, verificationMode } = req.body;

  try {
    const otpCode = generateOTP();
    if (verificationMode === "email") {
      await sendEmailOTP(email, otpCode);
    } else if (verificationMode === "phone") {
      await sendSMSOTP(phoneNumber, otpCode);
    } else {
      return res.status(400).json({ error: "Invalid verification mode" });
    }

    const otpSaved = await saveOtp(
      verificationMode,
      otpCode,
      phoneNumber,
      email
    );
    if (!otpSaved) {
      return res.status(500).json({ error: "Failed to save OTP" });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.post("/verifyOTP", async (req, res) => {
  const { otpCode, email, phoneNumber, verificationMode } = req.body;

  try {
    let otpDocument;
    if (verificationMode === "email") {
      otpDocument = await Modal.OtpModal.findOneAndDelete({ email, otpCode });
    } else if (verificationMode === "phone") {
      otpDocument = await Modal.OtpModal.findOneAndDelete({
        phoneNumber,
        otpCode,
      });
    } else {
      return res.status(400).json({ error: "Invalid verification mode" });
    }

    if (!otpDocument) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

exports.router = router;
