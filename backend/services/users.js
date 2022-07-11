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

const postUserService = async (id, genres) => {
  const genreParams = genres.map((genre) => ({ S: genre }));
  const params = {
    TableName: 'users',
    Item: {
      id: { S: id },
      genres: { L: genreParams },
    },
  };

  return await ddb.putItem(params).promise();
};

module.exports = {
  getUserService,
  postUserService,
};
