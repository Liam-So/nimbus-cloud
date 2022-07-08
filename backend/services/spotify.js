const axios = require('axios')
const qs = require('qs')
require('dotenv').config()
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const generateSongOfDay = async (genres) => {
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

    // TODO: store token in cookie
    const accessToken = tokenResponse.data.access_token,
      refreshToken = tokenResponse.data.refresh_token

    try {
      // we can recall this if there is a duplicate
      const genreResponse = await axios
        .get(
          process.env.SPOTIFY_REC_URL, {
          params: { limit: 1, seed_genres: genres },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
          },
        });
      return genreResponse.data.tracks
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  generateSongOfDay
}