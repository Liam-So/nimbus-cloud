const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const getUser = (req, res) => {
  const id = req.params.id;

  if (id) {
    const params = {
      TableName: 'users',
      Key: { id: { S: id } },
    };
    ddb.getItem(params, (err, user) => {
      if (err) {
        console.log('Error', err);
      } else {
        if (user.Item) {
          console.log('User found');
          res.status(200).send(user.Item);
        } else {
          console.log('No user found');
          res.status(400).send({ error: 'No user found with provided id.' });
        }
      }
    });
  } else {
    res.status(400).send({
      error: 'Error in request body. Please ensure you have the id attribute.',
    });
  }
};

const postUser = (req, res) => {
  const { id, genres } = req.body;

  // genres have to be validated on frontend
  if (id && genres) {
    // add data type for each genre
    const genreParams = genres.map((genre) => ({ S: genre }));

    const params = {
      TableName: 'users',
      Item: {
        id: { S: id },
        genres: { L: genreParams },
      },
    };

    ddb.putItem(params, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.status(400).send('User was not registered successfully.');
      } else {
        console.log('Success', data);
        res.status(200).send('User has been registered.');
      }
    });
  } else {
    res.status(400).send({
      error:
        'Error in request body. Please ensure you have the id and genres attribute.',
    });
  }
};

module.exports = {
  getUser,
  postUser,
};
