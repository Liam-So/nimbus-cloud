const request = require('request'); // "Request" library
require('dotenv').config()

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET


const authenticateApp = (req, res) => {
  const authOptions = {
    url: process.env.SPOTIFY_API_URL,
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.status(200).send(body)
    }
  });
}


module.exports = {
  authenticateApp
}