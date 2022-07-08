const axios = require('axios')
const qs = require('qs')

require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET


// params includes userID
const getRecommendations = async (req, res) => {
  const { id } = req.body

  if (id) {
    const headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: client_id,
        password: client_secret,
      },
    }

    const data = { grant_type: 'client_credentials' }
    // TODO: tailor to a specific user from dynamo
    try {
      const tokenResponse = await axios.post(
        process.env.SPOTIFY_API_URL,
        qs.stringify(data),
        headers
      )

      // TODO: store token in cookie
      const accessToken = tokenResponse.data.access_token,
        refreshToken = tokenResponse.data.refresh_token

      try {
        // we can recall this if there is a duplicate
        const genreResponse = await axios
          .get(
            process.env.SPOTIFY_REC_URL, {
            params: { limit: 1, seed_genres: 'classical,acoustic,techno' },
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer ' + accessToken,
              'Content-Type': 'application/json',
            },
          });
        res.send(genreResponse.data.tracks)
      } catch (error) {
        console.log(error)
        res.send(error)
      }
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  } else {
    res.status(400).send({ "error": "Error in request body. Please ensure you have the id attribute." })
  }
}

module.exports = {
  getRecommendations
}