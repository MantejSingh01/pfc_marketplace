const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String }, 
    pricingStructure: { type: Number },
    materialDescription: { type: String },
    materialSpecifications: {
      dimensions: { type: String },
      weight: { type: String },
      color: { type: String },
    },
    availableQuantity: { type: Number }, 
    offeredPrice: { type: Number }, 
    expectedCostPerKg: { type: Number }, 
    currentStockStatusKg: { type: Number }, 
    materialQualityImage: { type: String }, 
    materialType: { type: String }, 
    packaging: { type: String},
    availabilityDate: { type: Date }, 
    bulkListingTimeline: { type: Number }, 
  },{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

  const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;