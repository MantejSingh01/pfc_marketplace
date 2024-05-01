const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true  },
    email: { type: String, required: true, unique: true },
    designation: { type: String },
    companyName: { type: String },
    businessAddress: { type: String },
    industryCategory: { type: String },
    licencesCertifications: { type: String },
    taxID: { type: Number },
    isKYCDone: { type: Boolean, default: false }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
