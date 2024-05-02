const express = require("express");
const router = express.Router();
const Modal = require('../../mongoDB/modals/index');

router.get("/getKycInfo", async (req, res) => {
  try {
    const results = await Modal.KycModal.find();
    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post("/onboardKYC", async (req, res) => {
  try {
    const {
      userId,
      acceptanceTerms,
      complyWithPolicies,
      gstDetails,
      aadharNumber,
      panNumber,
      emergencyContact,
      bankDetails,
    } = req.body;
    console.log(
      userId,
      acceptanceTerms,
      complyWithPolicies,
      gstDetails,
      aadharNumber,
      panNumber,
      emergencyContact,
      bankDetails
    );
    const newKYC = new Modal.KycModal({
      userId,
      acceptanceTerms,
      complyWithPolicies,
      gstDetails,
      aadharNumber,
      panNumber,
      emergencyContact,
      bankDetails,
    });
    const savedKYC = await newKYC.save();

    const user = await Modal.UserModal.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isKYCDone = true;
    await user.save();
    res.status(201).json(savedKYC);
  } catch (error) {
    console.error("Error occurred during KYC onboarding:", error);
    res.status(500).json({ error: "Failed to onboard KYC information" });
  }
});

router.put('/editKyc/:id', async (req, res) => {
    const kycId = req.params.id;
    console.log("=====",kycId)
    try {
      const updatedKyc = await Modal.KycModal.findByIdAndUpdate(
        kycId,
        req.body,
        { new: true }
      );
      if (!updatedKyc) {
        return res.status(404).json({ error: 'KYC information not found' });
      }  
      res.status(200).json(updatedKyc);
    } catch (error) {
      console.error('Error occurred during KYC edit:', error);
      res.status(500).json({ error: 'Failed to update KYC information' });
    }
  });

  router.delete('/deleteKyc/:id', async (req, res) => {
    const kycId = req.params.id;
    try {
      const deletedKyc = await Modal.KycModal.findByIdAndDelete(kycId);
  
      if (!deletedKyc) {
        return res.status(404).json({ error: 'KYC information not found' });
      }
  
      res.status(200).json({ message: 'KYC information deleted successfully' });
    } catch (error) {
      console.error('Error occurred during KYC deletion:', error);
      res.status(500).json({ error: 'Failed to delete KYC information' });
    }
  });
  
  

exports.router = router;
