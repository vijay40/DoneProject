const express = require('express');
const patient = require('./patient');
const admin = require('./admin');

const router = express.Router();

router.use('/patient', patient);
router.use('/admin', admin);

module.exports = router;
