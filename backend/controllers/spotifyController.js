const { generateSongOfDay } = require('../services/spotify')
const { getUserService } = require('../services/users')

// params includes userID
const getRecommendations = async (req, res) => {
  const { id } = req.body

  try {
    const user = await getUserService(id)
    if (user.Item) {
      const userGenres = (user.Item.genres.L.map(genre => genre.S)).toString()
      const song = await generateSongOfDay(userGenres)
      res.send(song)
    } else {
      res.status(400).send({ "error": "No user found" })
    }
  } catch (err) {
    res.status(400).send({ "error": "Error in request body. Please ensure you have the id attribute." })
  }
}

module.exports = {
  getRecommendations
}