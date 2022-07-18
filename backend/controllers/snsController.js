const { getSandboxPhoneNumbers } = require("../services/sns");

const getNumbers = async (req, res) => {
  try {
    const numbers = await getSandboxPhoneNumbers();
    res.send(numbers.PhoneNumbers);
  } catch (err) {
    res.send({ Error: 'An error has occurred' });
  }
};

module.exports = {
  getNumbers,
};
