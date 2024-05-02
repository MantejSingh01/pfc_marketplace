const express = require('express');
const router = express.Router();
const Modal = require('../../mongoDB/modals/index');

router.get('/getAllMaterials', async (req, res) => {
    try {
        const results = await Modal.MaterialModal.find();
        console.log(results);
        res.status(200).json(results); 
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

router.post('/addMaterialSelection', async (req, res) => {
    try {
      const {
        listing,
        materialConfirmation,
        priceConfirmation,
        logisticsConfirmation,
        quantityConfirmation,
        qualityCheck,
        sellersConsent,
        paymentInformation,
      } = req.body;
  
      const newMaterialSelection = new Modal.MaterialModal({
        listing,
        materialConfirmation,
        priceConfirmation,
        logisticsConfirmation,
        quantityConfirmation,
        qualityCheck,
        sellersConsent,
        paymentInformation,
      });
  
      const savedMaterialSelection = await newMaterialSelection.save();
      res.status(201).json(savedMaterialSelection);
    } catch (error) {
      console.error('Error occurred during material selection creation:', error);
      res.status(500).json({ error: 'Failed to add new material selection' });
    }
  });
  router.put('/editMaterialSelection/:id', async (req, res) => {
    const materialSelectionId = req.params.id;
    try {
      const updatedFields = req.body; // Updated fields from the request body
  
      const updatedMaterialSelection = await Modal.MaterialModal.findByIdAndUpdate(
        materialSelectionId,
        updatedFields,
        { new: true } // Return the updated document
      );
  
      if (!updatedMaterialSelection) {
        return res.status(404).json({ error: 'Material selection not found' });
      }
  
      res.status(200).json(updatedMaterialSelection);
    } catch (error) {
      console.error('Error occurred during material selection edit:', error);
      res.status(500).json({ error: 'Failed to update material selection' });
    }
  });
  router.delete('/deleteMaterialSelection/:id', async (req, res) => {
    const materialSelectionId = req.params.id;
    try {
      const deletedMaterialSelection = await Modal.MaterialModal.findByIdAndDelete(materialSelectionId);
  
      if (!deletedMaterialSelection) {
        return res.status(404).json({ error: 'Material selection not found' });
      }
  
      res.status(200).json({ message: 'Material selection deleted successfully' });
    } catch (error) {
      console.error('Error occurred during material selection deletion:', error);
      res.status(500).json({ error: 'Failed to delete material selection' });
    }
  });
  
  
exports.router = router;