const Patient = require('../model/patient');
const log = require('../config/logger');

/**
 * Controller class to contain all method related to patients
 */
const PatientController = {
  /**
   * Method to register a patient
   * @param {*} req : Express Request containing name, email, and other details.
   * @param {*} res : Express Response
   */
  async register(req, res) {
    const { name, email, dob, address, phone, appointmentTime } = req.body;
    log.info(
      `Received a request to register a patient: ${JSON.stringify(req.body)}`,
    );
    try {
      const patient = new Patient({
        name,
        email,
        dob,
        address,
        phone,
        appointmentTime,
        licenseFileName: req.file.filename,
      });
      await patient.save();
      log.info('Successfully saved the patient');
    } catch (err) {
      log.error(`Exception while registering patient: ${err}`);
      return res.status(500).json({ msg: 'Server exception' });
    }
    res.json({ msg: 'Registration Successful' });
  },

  /**
   * Method to fetch all the patients
   * @param {*} req : Express request
   * @param {*} res : Express response
   */
  async getAllPatients(req, res) {
    log.info('Received a request to get all patients');
    try {
      const patients = await Patient.find({}).select([
        '-__v',
        '-createdAt',
        '-updatedAt',
      ]);
      res.json({ patients });
    } catch (err) {
      log.error(`Exception while fetching patients: ${err}`);
    }
  },
};

module.exports = PatientController;
