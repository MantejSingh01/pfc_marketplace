const express = require('express');
const router = express.Router();
const Modal = require('../mongoDB/modals/index');

router.get('/getAllUsers', async (req, res) => {
    try {
        const results = await Modal.UserModal.find();
        console.log(results);
        res.status(200).json(results); 
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


router.post('/onboardUser', async (req, res) => {
    try {
      const { name, phoneNumber, email, designation, companyName, businessAddress, industryCategory, licencesCertifications, taxID } = req.body;
      const existingUser = await Modal.UserModal.findOne({ $or: [{ phoneNumber }, { email }] });
      if (existingUser) {
        return res.status(409).json({ error: 'User with the same phone number or email already exists' });
      }

      const newUser = new Modal.UserModal({
        name,
        phoneNumber,
        email,
        designation,
        companyName,
        businessAddress,
        industryCategory,
        licencesCertifications,
        taxID
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error('Error occurred during onboarding:', error);
      res.status(500).json({ error: 'Failed to onboard user' });
    }
  });
  
  router.put('/editUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const updatedFields = req.body; 
      const updatedUser = await Modal.UserModal.findByIdAndUpdate(
        userId,
        updatedFields,
        { new: true } 
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error occurred during user edit:', error);
      res.status(500).json({ error: 'Failed to update user information' });
    }
  });

  router.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
      const deletedUser = await Modal.UserModal.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error occurred during user deletion:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  
  
exports.router = router;