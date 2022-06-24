const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Sample get endpoint to test
app.get('/', (req, res) => {
  res.send('Nimbus CSCI 4145 Project')
})

// Get a specific user from dynamoDB
app.get('/users', (req, res) => {
  if (req.body?.id) {
    const params = {
      TableName: 'users',
      Key: {
        'id': { S: req.body.id }
      },
    }
    ddb.getItem(params, function (err, user) {
      if (err) {
        console.log("Error", err);
      } else {
        if (user.Item) {
          res.status(200).send(user.Item)
        } else {
          res.status(400).send({ "error": "No user found with provided id." })
        }
      }
    });
  } else {
    res.status(400).send({ "error": "Error in request body. Please ensure you have the id attribute." })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
