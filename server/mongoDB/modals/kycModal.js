const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kycSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", },
  acceptanceTerms: { type: Boolean, },
  complyWithPolicies: { type: Boolean },
  gstDetails: { type: String },
  aadharNumber: { type: Number },
  panNumber: { type: String },
  emergencyContact: { type: Number },
  bankDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: Number },
    bankName: { type: String },
    ifscCode: { type: String,},
    cancelCheque: { type: String },
  },
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
const KYC = mongoose.model("KYC", kycSchema);
module.exports = KYC;
