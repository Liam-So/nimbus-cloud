const axios = require('axios')
const qs = require('qs')

require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const getRecommendations = async (req, res) => {
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

  try {
    const tokenResponse = await axios.post(
      process.env.SPOTIFY_API_URL,
      qs.stringify(data),
      headers
    )

    // do we need refresh?
    const accessToken = tokenResponse.data.access_token,
      refreshToken = tokenResponse.data.refresh_token

    try {
      const genreResponse = await axios
        .get(
          process.env.SPOTIFY_REC_URL, {
          params: { limit: 50, seed_genres: 'classical' },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        })

      res.send(genreResponse.data)
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

module.exports = {
  getRecommendations
}