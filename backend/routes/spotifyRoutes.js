const express = require('express')
const router = express.Router()
const spotifyController = require("../controllers/spotifyController")

// get a specific genre
router.get('/', spotifyController.getRecommendations)

module.exports = router