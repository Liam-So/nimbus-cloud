const axios = require('axios')
const qs = require('qs')

require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET

const authenticateApp = async (req, res) => {
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
    const response = await axios.post(
      process.env.SPOTIFY_API_URL,
      qs.stringify(data),
      headers
    )
    res.status(200).send(response.data)
  } catch (error) {
    console.log(error);
    res.status(400).send("Error")
  }
}

module.exports = {
  authenticateApp
}