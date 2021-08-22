const express = require('express');
const AdminController = require('../controller/AdminController');

const router = express.Router();

// POST route to add an admin account
router.post('/add', AdminController.add);

// POST route to validate admin login request
router.post('/login', AdminController.login);

module.exports = router;
