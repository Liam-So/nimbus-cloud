const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const getUserService = async (id) => {
  const params = {
    TableName: 'users',
    Key: { id: { S: id } },
  };
  return await ddb.getItem(params).promise();
};

const getAllUserService = async () => {
  const params = {
    TableName: 'users',
  };
  return await ddb.scan(params).promise();
};

const updateUserSongOfDay = async ({ id, url, song, img, artists }) => {
  const artistParams = artists.map((artist) => ({ S: artist }));
  const params = {
    ExpressionAttributeNames: {
      '#SURL': 'song_url',
      '#SN': 'song_name',
      '#IG': 'song_img',
      '#A': 'artists',
    },
    ExpressionAttributeValues: {
      ':u': {
        S: url,
      },
      ':n': {
        S: song,
      },
      ':i': {
        S: img,
      },
      ':a': {
        L: artistParams,
      },
    },
    Key: { id: { S: id } },
    ReturnValues: 'ALL_NEW',
    TableName: 'users',
    UpdateExpression: 'SET #SURL = :u, #SN = :n, #IG = :i, #A = :a',
  };

  return await ddb.updateItem(params).promise();
};

const postUserService = async (id, genres, phone) => {
  const genreParams = genres.map((genre) => ({ S: genre }));
  const params = {
    TableName: 'users',
    Item: {
      id: { S: id },
      genres: { L: genreParams },
      phone_number: { S: phone },
    },
  };

  return await ddb.putItem(params).promise();
};

module.exports = {
  getUserService,
  postUserService,
  getAllUserService,
  updateUserSongOfDay,
};
