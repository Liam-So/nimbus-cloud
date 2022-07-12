const express = require('express');
const router = express.Router();
const spotifyController = require('../controllers/spotifyController');

// get a specific genre
router.get('/:id', spotifyController.getRecommendations);

// upload new song for all users
router.post('/', spotifyController.postSongAllUsers)

module.exports = router;
