const AWS = require('aws-sdk');
const sns = new AWS.SNS();

const getNumbers = (req, res) => {
  try {
    sns.listSMSSandboxPhoneNumbers(function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        Object.entries(data.PhoneNumbers).map(([key, value]) => {
          console.log(data.PhoneNumbers[key].PhoneNumber);
        });
        res.send({
          'Phone Numbers': data.PhoneNumbers,
        });
      }
    });
  } catch (err) {
    res.send({ Error: 'An error has occurred' });
  }
};

module.exports = {
  getNumbers,
};
