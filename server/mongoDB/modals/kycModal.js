const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kycSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  acceptanceTerms: { type: Boolean, required: true },
  complyWithPolicies: { type: Boolean, required: true },
  gstDetails: { type: String },
  aadharNumber: { type: Number,unique: true   },
  panNumber: { type: String, unique: true },
  emergencyContact: { type: Number },
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: Number,unique: true  },
    bankName: { type: String },
    ifscCode: { type: String,},
    cancelCheque: { type: String },
  },
});
const KYC = mongoose.model("KYC", kycSchema);
module.exports = KYC;
