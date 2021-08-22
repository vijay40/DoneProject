const mongoose = require('../db/mongoose');

/**
 * MongoDB schema for the Admin.
 */
const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model('admin', AdminSchema);
module.exports = Admin;
