const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB.DocumentClient();

const getUserService = async (id) => {
  const params = {
    TableName: 'users',
    Key: { id: id }
  };
  return await ddb.get(params).promise();
};


const getAllUserService = async () => {
  const params = {
    TableName: 'users',
  };
  return await ddb.scan(params).promise();
};


const updateUserSongOfDay = async ({ id, url, song, img, artists }) => {
  const params = {
    TableName: 'users',
    Key: { id: id },
    UpdateExpression: "SET #s = list_append(#s, :songs)",
    ExpressionAttributeNames: { "#s": "songs" },
    ExpressionAttributeValues: {
      ":songs": [{
        url: url,
        song: song,
        img: img,
        artists: artists
      }]
    },
    ReturnValues: "UPDATED_NEW"
  }

  return await ddb.update(params).promise();
};


const postUserService = async (id, genres, phone_number) => {
  const params = {
    TableName: 'users',
    Item: {
      id: id,
      genres: genres,
      phone_number: phone_number,
      songs: []
    },
  };

  return await ddb.put(params).promise();
};


module.exports = {
  getUserService,
  postUserService,
  getAllUserService,
  updateUserSongOfDay,
};
