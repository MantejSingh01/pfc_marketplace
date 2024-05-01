const mongoose  = require("mongoose")

const Schema = mongoose.Schema;


const materialSchema = new Schema({
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: true }, 
    materialConfirmation: { type: String, required: true },
    priceConfirmation: { type: Number }, 
    logisticsConfirmation: { type: String, required: true },
    quantityConfirmation: { type: Number }, 
    qualityCheck: { type: String, required: true },
    sellersConsent: { type: String }, 
    paymentInformation: { type: String, required: true },
  });
  
  const Material = mongoose.model('Material', materialSchema);
  module.exports = Material;