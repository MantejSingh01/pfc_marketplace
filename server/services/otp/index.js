const express = require('express');
const router = express.Router();

router.use('/', require("./otpOperations").router)


module.exports = router;