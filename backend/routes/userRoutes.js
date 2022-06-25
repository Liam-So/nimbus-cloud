const express = require('express')
const router = express.Router()
const userController = require("../controllers/userController")

// Get a specific user
router.get('/', userController.getUser)

// Post a new user
router.post('/', userController.postUser)

module.exports = router