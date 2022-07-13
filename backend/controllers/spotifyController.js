const { generateSongOfDay } = require('../services/spotify');
const { getUserService, getAllUserService, updateUserSongOfDay } = require('../services/users');

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
    // get all users in dynamo
    const users = await getAllUserService();
    // extract ids and genres from data
    const userIds = users.Items.map(user => user.id.S)
    const userGenres = users.Items.map(user => user.genres.L.map(genre => genre.S).toString())
    // store all new users from db
    const updatedList = []

    let index = 0
    // generate a new song for each user
    for (const genre of userGenres) {
      const generatedSong = await generateSongOfDay(genre)
      const songData = {
        "id": userIds[index],
        "url": generatedSong[0].external_urls.spotify,
        "song": generatedSong[0].name,
        "img": generatedSong[0].album.images[1].url,
        "artists": generatedSong[0].artists.map(artist => artist.name)
      }
      // write to db 
      const newUser = await updateUserSongOfDay(songData)
      // add the updated user
      updatedList.push(newUser)
      index += 1
    }

    res.send(updatedList)
  } catch (err) {
    res.send({ "Err": err })
  }
}


module.exports = {
  getRecommendations,
  postSongAllUsers
};
