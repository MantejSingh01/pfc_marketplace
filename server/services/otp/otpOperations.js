const express = require('express');
const router = express.Router();
const Modal = require("../../mongoDB/modals/index");
const nodemailer = require('nodemailer'); 
const twilio = require('twilio'); 


const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'mickeysandhu7@gmail.com', 
    pass: 'your_email_password', 
  },
});


const twilioClient = twilio('AC079d2a99846816f98ff054c5b7a07fa3', 'f9d0db1522ad17fd50d41c20283703e9');


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}


router.post('/sendOTP', async (req, res) => {
  const { email, phoneNumber, verificationMode } = req.body;
  
  try {
    let otpDocument;
    const otpCode = generateOTP();
    if (verificationMode === 'email') {
      otpDocument = new Modal.OtpModal({ email, otpCode });
      // Send OTP via email
      const mailOptions = {
        from: 'mickeysandhu7@gmail.com',
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is: ${otpCode}`,
      };
      await transporter.sendMail(mailOptions);
    } else if (verificationMode === 'phone') {
      otpDocument = new Modal.OtpModal({ phoneNumber, otpCode });
      await twilioClient.messages.create({
        body: `Your OTP is: ${otpCode}`,
        from: '+12546383284', 
        to: `+91${phoneNumber}`,
      });
    } else {
      return res.status(400).json({ error: 'Invalid verification mode' });
    }
    await otpDocument.save();

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});


router.post('/verifyOTP', async (req, res) => {
  const { otpCode, email, phoneNumber, verificationMode } = req.body;
  
  try {
    let otpDocument;
    if (verificationMode === 'email') {
      otpDocument = await Modal.OtpModal.findOne({ email, otpCode });
      await Modal.KycModal.findOne({ phoneNumber, otpCode });
    } else if (verificationMode === 'phone') {
      otpDocument = await Modal.OtpModal.findOneAndDelete({ phoneNumber, otpCode });
      await Modal.KycModal.findOneAndDelete({ phoneNumber, otpCode });
    } else {
      return res.status(400).json({ error: 'Invalid verification mode' });
    }
    if (!otpDocument) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
   

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

exports.router = router;
