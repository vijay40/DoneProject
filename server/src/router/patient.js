const express = require('express');
const multer = require('multer');
const PatientController = require('../controller/PatientController');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// POST route to register a patient
router.post(
  '/register',
  upload.single('licenseImage'),
  PatientController.register,
);

// GET route to fetch all the patients
router.get('/all', PatientController.getAllPatients);

module.exports = router;
