const { getUserService, postUserService } = require('../services/users');

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await getUserService(id);
    if (user.Item) {
      res.send(user.Item);
    } else {
      res.send({ 'Error:': 'No user found' });
    }
  } catch (err) {
    res.send({ Error: err });
  }
};

const postUser = async (req, res) => {
  const { id, genres, phone_number } = req.body;
  try {
    const user = await postUserService(id, genres, phone_number);
    res.send({ Status: 'User was successfully sent', meta: user });
  } catch (err) {
    res.send({ Error: err });
  }
};

module.exports = {
  getUser,
  postUser,
};
