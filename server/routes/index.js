const express = require('express');
const router = express.Router();

router.use('/user', require("./user").router)
router.use('/kyc', require("./kyc").router)
router.use('/material', require("./material").router)
router.use('/listing', require("./listing").router)

module.exports = router;