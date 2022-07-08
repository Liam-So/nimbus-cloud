const { getUserService, postUserService } = require('../services/users')

const getUser = async (req, res) => {
  const { id } = req.body
  try {
    const user = await getUserService(id)
    if (user.Item) {
      res.send(user.Item)
    } else {
      res.send({ "Error:": "No user found" })
    }
  } catch (err) {
    res.send({ "Error": "Something went wrong" })
  }
}

const postUser = async (req, res) => {
  const { id, genres } = req.body
  try {
    const user = await postUserService(id, genres)
    res.send({ "Status": "User was successfully sent", "meta": user })
  } catch (err) {
    res.send({ "Error": "Something went wrong" })
  }
}

module.exports = {
  getUser,
  postUser
}