const mongoose = require('../db/mongoose');

/**
 * MongoDB schema for patient.
 */
const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    dob: Date,
    phone: String,
    address: String,
    licenseFileName: String,
    appointmentTime: Date,
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model('patient', PatientSchema);
module.exports = Patient;
