const express = require('express');
const router = express.Router();
const Modal = require('../../mongoDB/modals/index');


router.get('/getAllListing', async (req, res) => {
    try {
        const results = await Modal.ListingModal.find();
        console.log(results);
        res.status(200).json(results); 
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

router.post('/addListing', async (req, res) => {
    try {
      const {
        // user,
        description,
        pricingStructure,
        materialDescription,
        materialSpecifications,
        availableQuantity,
        offeredPrice,
        expectedCostPerKg,
        currentStockStatusKg,
        materialQualityImage,
        materialType,
        packaging,
        availabilityDate,
        bulkListingTimeline,
      } = req.body;
  
      const newListing = new Modal.ListingModal({
        // user,
        description,
        pricingStructure,
        materialDescription,
        materialSpecifications,
        availableQuantity,
        offeredPrice,
        expectedCostPerKg,
        currentStockStatusKg,
        materialQualityImage,
        materialType,
        packaging,
        availabilityDate,
        bulkListingTimeline,
      });
  
      const savedListing = await newListing.save();
      res.status(201).json(savedListing);
    } catch (error) {
      console.error('Error occurred during listing creation:', error);
      res.status(500).json({ error: 'Failed to add new listing' });
    }
  });
  router.put('/editListing/:id', async (req, res) => {
    const listingId = req.params.id;
    try {
      const updatedFields = req.body; 
  
      const updatedListing = await Modal.ListingModal.findByIdAndUpdate(
        listingId,
        updatedFields,
        { new: true } 
      );
  
      if (!updatedListing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
  
      res.status(200).json(updatedListing);
    } catch (error) {
      console.error('Error occurred during listing edit:', error);
      res.status(500).json({ error: 'Failed to update listing information' });
    }
  });
  
  router.delete('/deleteListing/:id', async (req, res) => {
    const listingId = req.params.id;
    try {
      const deletedListing = await Modal.ListingModal.findByIdAndDelete(listingId);
  
      if (!deletedListing) {
        return res.status(404).json({ error: 'Listing not found' });
      }
  
      res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
      console.error('Error occurred during listing deletion:', error);
      res.status(500).json({ error: 'Failed to delete listing' });
    }
  });
  
  
exports.router = router;