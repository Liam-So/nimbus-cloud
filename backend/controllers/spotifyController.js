const { generateSongOfDay } = require('../services/spotify');
const { getUserService, getAllUserService } = require('../services/users');

// params includes userID
const getRecommendations = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await getUserService(id);
    if (user.Item) {
      const userGenres = user.Item.genres.L.map((genre) => genre.S).toString();
      const song = await generateSongOfDay(userGenres);
      res.send(song);
    } else {
      res.status(400).send({ error: 'No user found' });
    }
  } catch (err) {
    res
      .status(400)
      .send({
        error:
          'Error in request body. Please ensure you have the id attribute.',
      });
  }
};


// upload new song for all users
const postSongAllUsers = async (req, res) => {
  try {
    const users = await getAllUserService();
    // gets each genre into an array of strings
    const userGenres = users.Items.map(user => user.genres.L.map(genre => genre.S).toString())
    const newMusicForAllUsers = []

    for (const genre of userGenres) {
      const generatedSong = await generateSongOfDay(genre)
      const songData = {
        "url": generatedSong[0].external_urls.spotify,
        "song_name": generatedSong[0].name,
        "img": generatedSong[0].album.images[1],
        "artists": generatedSong[0].artists.map(artist => artist.name)
      }
      newMusicForAllUsers.push(songData)
    }

    res.send(newMusicForAllUsers)
  } catch (err) {
    res.send({ "Err": err })
  }
}


module.exports = {
  getRecommendations,
  postSongAllUsers
};
