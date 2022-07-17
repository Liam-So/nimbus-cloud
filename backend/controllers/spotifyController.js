const { generateSongOfDay } = require('../services/spotify');
const {
  getUserService,
  getAllUserService,
  updateUserSongOfDay,
} = require('../services/users');
const { sendSMS, getSandboxPhoneNumbers } = require('../services/sns');

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
    res.status(400).send({
      error: 'Error in request body. Please ensure you have the id attribute.',
    });
  }
};

// upload new song for all users
const postSongAllUsers = async (req, res) => {
  try {
    // get all users in dynamo
    const { Items: users } = await getAllUserService();

    // get each phone number from our sandbox env
    const { PhoneNumbers: numbers } = await getSandboxPhoneNumbers()
    const filteredNumbers = numbers.map(number => number.PhoneNumber)

    // create a new list of updated users
    const updatedList = []

    // for each user in users, update the song of the day
    for (const user of users) {
      const user_genres = user.genres.L.map(genre => genre.S).toString();
      const generatedSong = await generateSongOfDay(user_genres)
      // since our endpoint only gets 1 song we can get the first element
      const song = generatedSong[0]
      const artists = song.artists.map((artist) => artist.name)
      const songData = {
        id: user.id.S,
        url: song.external_urls.spotify,
        song: song.name,
        img: song.album.images[1].url,
        artists: artists,
      };
      // write to db
      const updatedUser = await updateUserSongOfDay(songData);

      // send sms
      const phone_number = user.phone_number.S

      // only send to numbers that have been validated (only for sandbox)
      if (filteredNumbers.includes(phone_number)) {
        await sendSMS(
          phone_number,
          song.name,
          artists,
          song.external_urls.spotify
        )
      }

      // add the updated user
      updatedList.push(updatedUser);
    }

    res.status(200).send(updatedList);
  } catch (err) {
    res.send({ Err: err });
  }
};

module.exports = {
  getRecommendations,
  postSongAllUsers,
};
