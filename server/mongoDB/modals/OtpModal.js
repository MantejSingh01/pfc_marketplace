const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the OTP schema
const otpSchema = new Schema({
  email:{type: String},
  phoneNumber: { type: Number },
  otpCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, 
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
