const Admin = require('../model/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const log = require('../config/logger');

/**
 * Controller class to contains all methods related to Admin
 */
const AdminController = {
  /**
   * Method to add an Admin account
   * @param {*} req : Express Request containing username and password
   * @param {*} res : Express Response
   */
  async add(req, res) {
    const { username, password } = req.body;
    log.info(
      'received a request for adding an admin account with username',
      username,
    );
    try {
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const admin = new Admin({
        username,
        password: hashedPass,
      });
      await admin.save();
      log.info('Successfully saved the admin');
    } catch (err) {
      log.error('Exception while creating admin account: ' + err);
    }
    return res.json({ msg: 'Registration Successful' });
  },

  /**
   * Method to validate the login of an Admin
   * @param {*} req : Express request containing username and password
   * @param {*} res : Express response
   */
  async login(req, res) {
    const { username, password } = req.body;
    log.info(`received login request for username: ${username}`);
    try {
      // validate if admin exists
      const result = await Admin.find({ username }).select([
        'username',
        'password',
      ]);
      const admin = result[0];
      if (!admin) {
        return res.status(400).json({ msg: 'Invalid username / password' });
      }

      // compare passwords
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid username / password' });
      }

      const authToken = await jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 10800,
        },
      );
      log.info('Admin authentication successful');
      return res.cookie('authToken', authToken).json({ msg: 'Successful' });
    } catch (err) {
      log.error(`Error while authenticating admin: ${err}`);
      return res.status(500).json({ msg: 'Unexpected server error' });
    }
  },
};

module.exports = AdminController;
