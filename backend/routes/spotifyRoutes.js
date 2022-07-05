const express = require('express')
const router = express.Router()
const spotifyController = require("../controllers/spotifyController")


// Post a new user
router.post('/', spotifyController.authenticateApp)

module.exports = router