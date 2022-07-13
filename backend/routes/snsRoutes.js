const express = require('express');
const router = express.Router();
const snsController = require('../controllers/snsController');

// Get a specific user
router.get('/', snsController.getNumbers);

module.exports = router;
