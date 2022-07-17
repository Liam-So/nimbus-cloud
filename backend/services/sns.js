const AWS = require('aws-sdk');
const sns = new AWS.SNS({ region: 'us-east-1' });

const getSandboxPhoneNumbers = async () => {
  return await sns.listSMSSandboxPhoneNumbers().promise();
}

const sendSMS = async (phone_number, song_name, song_artist, url) => {
  let artists;
  if (song_artist.length > 1) {
    artists = song_artist.toString();
  } else {
    artists = song_artist;
  }
  const params = {
    Message: `Your song of the day: ${song_name} by ${artists}. Listen Here: ${url}`,
    PhoneNumber: phone_number,
  };

  sns.publish(params).promise()
};


module.exports = {
  sendSMS,
  getSandboxPhoneNumbers
};
