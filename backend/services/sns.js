const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

const sendSMS = (phone_number, song_name, song_artist, url) => {
  let artists;
  if (song_artist.length > 1) {
    artists = song_artist.toString();
  } else {
    artists = song_artist;
  }
  const params = {
    Message:
      'Your song of the day: ' +
      song_name +
      ' by ' +
      artists +
      '.  Listen Here: ' +
      url,
    PhoneNumber: phone_number,
  };

  sns.publish(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
};

module.exports = {
  sendSMS,
};
